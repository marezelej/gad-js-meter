import {args, BaseCommand, flags} from '@adonisjs/core/build/standalone'
import CodeImporter from 'App/Code/CodeImporter'
import FunctionCode from "App/Models/FunctionCode";
import execa from "execa";
import {unique} from "@adonisjs/lucid/build/src/utils";

export default class ImportCode extends BaseCommand {
  public static commandName = 'code:import'
  public static description = 'Import code from the desired directory'

  public static settings = {
    loadApp: true,
    stayAlive: false,
  }

  @args.string({description: 'The scanned directory', required: false})
  public dir: string

  @args.string({description: 'The limit of files to scan', required: false})
  public limit: string

  @flags.boolean({alias: 'l', description: 'Log functions list instead of insert into table'})
  public log: boolean

  @flags.boolean({alias: 'i', description: 'Index functions list after import'})
  public index: boolean

  public async run() {
    const importer = new CodeImporter()
    const functions = await importer.handle(this.dir || '../code-examples', parseInt(this.limit || '5000'))
    this.logger.info(`${functions.length} functions were found.`)
    if (this.log) {
      console.log(functions)
    } else {
      const count = await FunctionCode.import(unique(functions))
      this.logger.info(`${count} new functions were inserted.`)
    }
    return await this.runIndex()
  }

  private async runIndex() {
    if (this.index) {
      return execa.node('ace', ['code:index'], {
        stdio: 'inherit',
      })
    }
    return 0
  }
}
