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
    this.logger.info(`Measure results:`)
    this.logger.info(`Zero distance assert count: ${this.metric.zeroDistanceAssertCount}`)
    this.logger.info(`First ${this.getSearchLimit()} assert count: ${this.metric.firstAssertCount}`)
  }

  private async loadMeasure(sample: string, target: string) {
    let results = await this.searchService.search(sample, this.getSearchDistance(), this.getSearchLimit())
    results = results.filter((result) => result.code === target)
    if (results.length === 0) {
      return;
    }
    const result = results[0]
    this.measureFirstAssert()
    if (result.distance === 0) {
      this.measureZeroDistanceAssert()
    }
  }

  private getSearchDistance(): number {
    return this.distance || 100
  }

  private getSearchLimit(): number {
    return this.limit || 5
  }

  private measureFirstAssert() {
    this.metric.firstAssertCount++
  }

  private measureZeroDistanceAssert() {
    this.metric.zeroDistanceAssertCount++
  }
}

class Metric {
  zeroDistanceAssertCount: number = 0 // Estaba con distancia 0
  firstAssertCount: number = 0 // Estaba entre los primeros n
}
