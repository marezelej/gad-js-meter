import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Pivot extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public code: string

  public static async getPivots(): Promise<string[]> {
    return (await Pivot
      .query()
      .orderBy('id', 'asc')
      .select('code'))
      .map((c) => c.code)
  }
}
