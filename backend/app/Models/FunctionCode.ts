import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class FunctionCode extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column()
  public code: string

  @column()
  public nodeId: number

  static async import(functions: string[]): Promise<number> {
    const models = await this.fetchOrCreateMany(['code'], functions.map((code) => this.buildFromCode(code)))
    return models.filter((m) => m.$isLocal).length
  }

  // TODO Calculate nodeId
  private static buildFromCode(code: string) {
    return {code};
  }

  public static async getByParents(parentKeys: number[]):Promise<FunctionCode[]> {
    return FunctionCode.query()
    .whereIn('node_id', parentKeys)
  }

}
