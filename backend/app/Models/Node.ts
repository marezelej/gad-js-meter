import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Node extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public distance: number

  @column()
  public parentNodeId: number|null

  public static async getRoot(): Promise<Node> {
    return await Node.query().whereNull('parent_node_id').firstOrFail()
  }

  public static async getChildren(dFrom: number, dTo: number, parentKeys: number[]): Promise<Node[]> {
    return Node.query()
      .whereBetween('distance', [dFrom, dTo])
      .whereIn('parent_node_id', parentKeys)
  }
}
