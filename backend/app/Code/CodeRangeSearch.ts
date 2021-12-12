import service from "@ioc:GAD/Distance";
import { Node } from "acorn";
import FunctionCode from "App/Models/FunctionCode";

interface SearchResult {
  code: string
  distance: number
}

export default class CodeRangeSearch {
  async search(_code: string, _range: number, limit: number): Promise<SearchResult[]> {
    let results: SearchResult[] = []
    let padres: number[] = []
	  let pivot_dist
    const rootNode = await Node.getRoot()
    padres.push(rootNode.id)
    let pivots = await Pivots.getPivots()
    for (let i = 0; pivots.length; i++ ) {
      pivot_dist = await service.distance(_code, pivots[i])
      padres = (await Node.getChildren(pivot_dist - _range, pivot_dist + _range, padres)).map(e => e.id )
    }
    let nodeParents = await FunctionCode.getByParents(padres)
    for (let j = 0; j < nodeParents.length; j++) {
      let distance = await service.distance(_code, pivots[j])
      if (distance <= _range) {
        let result = {
          code: pivots[j],
          distance: distance
        }
        results.push(result)
      }
    }
    return results.slice(0, limit)
  }
}
