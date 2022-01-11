import {BaseCommand, flags} from '@adonisjs/core/build/standalone'
import CodeImporter from "App/Code/CodeImporter";
import CodeRangeSearch from "App/Code/CodeRangeSearch";

export default class MeasureCode extends BaseCommand {
  public static commandName = 'code:measure'
  public static description = 'Measure code in code-samples folder to get output metrics.'
  public static settings = {
    loadApp: true,
    stayAlive: false,
  }
  private searchService: CodeRangeSearch = new CodeRangeSearch()
  private metric: Metric = new Metric()

  @flags.number({ alias: 'd' })
  public distance: number

  @flags.number({ alias: 'l' })
  public limit: number

  public async run() {
    this.logger.info(`Measuring with first ${this.getSearchLimit()} functions metric.`)
    const importer = new CodeImporter()
    const functions = await importer.handle('../code-samples', 5000)
    for (let i = 0; i < functions.length; i += 2) {
      await this.loadMeasure(functions[i], functions[i + 1])
    }
    const totalCount = functions.length / 2
    this.logger.info(`Measure results:`)
    this.logger.info(`Total count: ${totalCount}`)
    this.logger.info(`First assert count: ${this.metric.firstAssertCount} (${(this.metric.firstAssertCount * 100 / totalCount).toFixed(2)}%)`)
    this.logger.info(`Between ${this.getSearchLimit()} results assert count: ${this.metric.notBadCount} (${(this.metric.notBadCount * 100 / totalCount).toFixed(2)}%)`)
  }

  private async loadMeasure(dbCode: string, modifiedCode: string) {
    const results = await this.searchService.search(modifiedCode, this.getSearchDistance(), this.getSearchLimit())
    const found = results.filter((result) => result.code === dbCode).length > 0
    if (!found) {
      return;
    }
    this.measureNotBad()
    if (results[0].code === dbCode) {
      this.measureFirstAssert()
    }
  }

  private getSearchDistance(): number {
    return this.distance || 100
  }

  private getSearchLimit(): number {
    return this.limit || 5
  }

  private measureNotBad() {
    this.metric.notBadCount++
  }

  private measureFirstAssert() {
    this.metric.firstAssertCount++
  }
}

class Metric {
  firstAssertCount: number = 0 // Era el primer resultado
  notBadCount: number = 0 // Estaba entre los primeros n
}
