import {args, BaseCommand} from '@adonisjs/core/build/standalone'
import CodeImporter from 'App/Code/CodeImporter'

export default class ImportCode extends BaseCommand {
  public static commandName = 'import:code'
  public static description = 'Import code from the desired directory'

  public static settings = {
    loadApp: true,
    stayAlive: false,
  }

  @args.string({description: 'The scanned directory', required: false})
  public dir: string

  @args.string({description: 'The limit of files to scan', required: false})
  public limit: string

  public async run() {
    const importer = new CodeImporter()
    const functions = await importer.handle(this.dir || '../code-examples', parseInt(this.limit || '5000'))
    console.log(functions)
  }
}
