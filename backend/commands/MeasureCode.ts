import { BaseCommand, flags } from '@adonisjs/core/build/standalone'
import CodeImporter from 'App/Code/CodeImporter'
import CodeRangeSearch from 'App/Code/CodeRangeSearch'
import FunctionCode from 'App/Models/FunctionCode'
import { writeFile } from 'fs/promises'
import { toVector } from 'App/Distance/Manhattan/MetricVectorsDistance'
import execa from 'execa'

export default class MeasureCode extends BaseCommand {
  public static commandName = 'code:measure'
  public static description = 'Measure code in code-samples folder to get output metrics.'
  public static settings = {
    loadApp: true,
    stayAlive: false,
  }
  private searchService: CodeRangeSearch = new CodeRangeSearch()
  private metric: Metric = new Metric()
  private measureReport = ''
  private diffSumVector = {}

  @flags.number({ alias: 'd' })
  public distance: number

  @flags.number({ alias: 'l' })
  public limit: number

  @flags.boolean({ alias: 'i', description: 'Index functions list before measure' })
  public index: boolean
  private totalCount: number

  public async run() {
    await this.runIndex()
    this.logger.info(`Measuring with first ${this.getSearchLimit()} functions metric.`)
    const importer = new CodeImporter()
    const functions = await importer.handle('../code-samples', 5000)
    const results = await Promise.all(this.handleFunctions(functions))
    this.totalCount = results.filter((r) => r).length
    this.logger.info(`Measure results:`)
    this.logger.info(`Total count: ${this.totalCount}`)
    this.logger.info(this.firstAssertCountText())
    this.logger.info(this.notBadResultText())
    await this.saveMeasureReport()
  }

  private firstAssertCountText() {
    return `First assert count: ${this.metric.firstAssertCount} (${(
      (this.metric.firstAssertCount * 100) /
      this.totalCount
    ).toFixed(2)}%)`
  }

  private notBadResultText() {
    return `Between ${this.getSearchLimit()} results assert count: ${this.metric.notBadCount} (${(
      (this.metric.notBadCount * 100) /
      this.totalCount
    ).toFixed(2)}%)`
  }

  private handleFunctions(functions) {
    let promises: Promise<any>[] = []
    for (let i = 0; i < functions.length; i += 2) {
      promises.push(
        new Promise(async (resolve) => {
          if (!(await this.validateFunctions(functions[i], functions[i + 1]))) {
            return resolve(false)
          }
          await this.loadMeasure(functions[i], functions[i + 1])
          resolve(true)
        })
      )
    }
    return promises
  }

  private async runIndex() {
    if (this.index) {
      return execa.node('ace', ['code:index', '-r'], {
        stdio: 'inherit',
      })
    }
    return 0
  }

  private async loadMeasure(dbCode: string, modifiedCode: string) {
    const results = await this.searchService.search(
      modifiedCode,
      this.getSearchDistance(),
      this.getSearchLimit()
    )
    const found = results.filter((result) => result.code === dbCode).length > 0
    if (!found) {
      this.loadMissingReport(dbCode, modifiedCode)
      return
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

  private async validateFunctions(dbCode: string, modifiedCode: string) {
    if (!(await FunctionCode.query().where('code', dbCode).first())) {
      this.logger.warning('Missing DB function:')
      this.logger.warning(dbCode)
      return false
    }
    if (await FunctionCode.query().where('code', modifiedCode).first()) {
      this.logger.warning('Existing sample function:')
      this.logger.warning(modifiedCode)
      return false
    }
    return true
  }

  private loadMissingReport(dbCode: string, modifiedCode: string) {
    this.measureReport += '-------------\n'
    this.measureReport += '### DB code:\n'
    this.measureReport += `\`\`\`\n${dbCode}\n\`\`\`\n`
    this.measureReport += '### Modified code:\n'
    this.measureReport += `\`\`\`\n${modifiedCode}\n\`\`\`\n`
    this.measureReport += '### Vectors comparison:\n'
    this.measureReport += `\`\`\`\n${this.getVectorsComparison(dbCode, modifiedCode)}\n\`\`\`\n`
  }

  private getVectorsComparison(aCode: string, bCode: string): string {
    const aVector = toVector(aCode)
    const bVector = toVector(bCode)
    let r = {}
    for (let key of Object.keys(aVector)) {
      let diff = aVector[key] - bVector[key]
      if (diff !== 0) {
        r[key] = diff
        if (!this.diffSumVector[key]) {
          this.diffSumVector[key] = 0
        }
        this.diffSumVector[key] += Math.abs(diff)
      }
    }
    return JSON.stringify(r, null, 2)
  }

  private async saveMeasureReport() {
    let report = '# Missing functions report\n\n'
    report += '### Measure Results:\n'
    report += `- Total count: ${this.totalCount}\n`
    report += `- ${this.firstAssertCountText()}\n`
    report += `- ${this.notBadResultText()}\n`
    report += '### Sum of vectors abs diff:\n'
    report += `\`\`\`\n${JSON.stringify(this.diffSumVector, null, 2)}\n\`\`\`\n`
    report += this.measureReport
    await writeFile(`../measure_report_${Date.now()}.md`, report)
  }
}

class Metric {
  public firstAssertCount: number = 0 // Era el primer resultado
  public notBadCount: number = 0 // Estaba entre los primeros n
}
