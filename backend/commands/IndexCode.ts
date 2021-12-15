import {BaseCommand, flags} from '@adonisjs/core/build/standalone'
import Database from '@ioc:Adonis/Lucid/Database'
import CodeIndex from 'App/Code/CodeIndex'
import {ApplicationContract} from '@ioc:Adonis/Core/Application'
import {KernelContract} from '@adonisjs/ace/build/src/Contracts'
import FunctionCode from 'App/Models/FunctionCode'
import Node from 'App/Models/Node'
import Pivot from 'App/Models/Pivot'

export default class IndexCode extends BaseCommand {
  public static commandName = 'code:index'
  public static description = 'Index code at the database'

  public static settings = {
    loadApp: true,
    stayAlive: false,
  }
  private codeIndex: CodeIndex

  @flags.boolean({alias: 'r', description: 'Reset the pivots table'})
  public reset: boolean

  constructor(application: ApplicationContract, kernel: KernelContract) {
    super(application, kernel)
    this.codeIndex = new CodeIndex()
  }

  public async run() {
    if (this.reset) {
      this.logger.warning('Reset the nodes list')
      await FunctionCode.query().update({node_id: null})
      await Node.query().delete()
    }
    const functionCodes = await FunctionCode.query().whereNull('node_id')
    this.logger.info(`Indexing ${functionCodes.length} functions...`)
    const pivots = await this.getPivots(functionCodes.map((f) => f.code))
    for (const f of functionCodes) {
      let node: any = await this.codeIndex.getNodes(pivots, f.code)
      let dbParentNode = await Node.firstOrCreate({parentNodeId: null, distance: 0})
      do {
        dbParentNode = await Node.firstOrCreate({parentNodeId: dbParentNode.id, distance: node.distance})
        node = node.children
      } while (node !== null)
      f.nodeId = dbParentNode.id
      await f.save()
    }
    this.logger.info(`The indexes were created.`)
  }

  private async getPivots(codeSpace: string[]): Promise<string[]> {
    let pivots: string[] = []
    if (this.reset) {
      this.logger.warning('Reset the pivots list')
      await Database.from('pivots').delete()
    } else {
      pivots = await Pivot.getPivots()
    }
    if (pivots.length < 1) {
      pivots = await this.buildPivots(codeSpace)
      await Database.table('pivots').insert(pivots.map((code) => ({code})))
      this.logger.info(`${pivots.length} pivots were created`)
    }
    return pivots
  }

  private buildPivots(codeSpace: string[]) {
    return this.codeIndex.getPivots(codeSpace, 7, 10, 80)
  }
}
