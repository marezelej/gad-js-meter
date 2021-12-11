import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Node extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public distance: number

  @column()
  public parentNodeId: number|null
}
