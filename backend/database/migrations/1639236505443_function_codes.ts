import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class FunctionCodes extends BaseSchema {
  protected tableName = 'function_codes'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.timestamp('created_at', { useTz: true })
      table.text('code').unique()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
