import FunctionCode from "App/Models/FunctionCode";

interface SearchResult {
  code: string
  distance: number
}

export default class CodeRangeSearch {
  async search(_code: string, _range: number, limit: number): Promise<SearchResult[]> {
    const results: SearchResult[] = []
    // TODO search by range
    results.push(...(await FunctionCode.query().limit(limit)).map((f) => ({
      code: f.code,
      distance: 1
    })))
    return results
  }
}
