import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Pivots extends BaseSchema {
  protected tableName = 'pivots'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.text('code').unique()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
