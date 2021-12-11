import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Nodes extends BaseSchema {
  protected tableName = 'nodes'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.bigInteger('parent_node_id').nullable()
      table.foreign('parent_node_id').references('id').inTable(this.tableName)
      table.bigInteger('distance').unsigned()
    })
    this.schema.alterTable('function_codes', (table) => {
      table.bigInteger('node_id').nullable()
      table.foreign('node_id').references('id').inTable(this.tableName)
    })
  }

  public async down () {
    this.schema.alterTable('function_codes', (table) => {
      table.dropForeign('node_id')
      table.dropColumn('node_id')
    })
    this.schema.dropTable(this.tableName)
  }
}
