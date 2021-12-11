import {BaseCommand, flags} from '@adonisjs/core/build/standalone'
import Database from '@ioc:Adonis/Lucid/Database'
import CodeIndex from 'App/Code/CodeIndex'
import {ApplicationContract} from '@ioc:Adonis/Core/Application'
import {KernelContract} from '@adonisjs/ace/build/src/Contracts'
import FunctionCode from 'App/Models/FunctionCode'
import Node from 'App/Models/Node'

export default class IndexCode extends BaseCommand {
  public static commandName = 'code:index'
  public static description = 'Index code at the database'

  public static settings = {
    loadApp: true,
    stayAlive: false,
  }
  private codeIndex: CodeIndex

  @flags.boolean({ alias: 'r', description: 'Reset the pivots table' })
  public reset: boolean

  constructor(application: ApplicationContract, kernel: KernelContract) {
    super(application, kernel)
    this.codeIndex = new CodeIndex()
  }

  public async run() {
    const functionCodes = await FunctionCode.all()
    this.logger.info(`Indexing ${functionCodes.length} functions...`)
    const pivots = await this.getPivots(functionCodes.map((f) => f.code))
    await Promise.all(functionCodes.map(async (f: FunctionCode) => {
      let node = await this.codeIndex.getNodes(pivots, f.code)
      let dbParentNode = await Node.firstOrCreate({parentNodeId: null, distance: 0})
      do {
        dbParentNode = await Node.firstOrCreate({parentNodeId: dbParentNode.id, distance: node.distance})
      } while (node.children !== null)
      f.nodeId = dbParentNode.id
      await f.save()
    }))
    this.logger.info(`The indexes were created.`)
  }

  private async getPivots(codeSpace: string[]): Promise<string[]> {
    let pivots: string[] = []
    if (this.reset) {
      this.logger.warning('Reset the pivots list.')
      await Database.from('pivots').delete()
    } else {
      pivots = await this.dbPivots()
    }
    if (pivots.length < 1) {
      pivots = await this.buildPivots(codeSpace)
      await Database.table('pivots').insert(pivots.map((code) => ({code})))
    }
    return pivots
  }

  private async dbPivots(): Promise<string[]> {
    return (await Database
      .from('pivots')
      .orderBy('id', 'asc')
      .select('code'))
      .map((c) => c.code)
  }

  private buildPivots(codeSpace: string[]) {
    return this.codeIndex.getPivots(codeSpace, 7, 10, 80)
  }
}
