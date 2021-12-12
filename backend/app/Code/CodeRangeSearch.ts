import service from "@ioc:GAD/Distance";
import FunctionCode from "App/Models/FunctionCode";
import Pivot from "App/Models/Pivot";
import {default as NodeModel} from "App/Models/Node";

interface SearchResult {
  code: string
  distance: number
}

export default class CodeRangeSearch {
  async search(_code: string, _range: number, limit: number): Promise<SearchResult[]> {
    let results: SearchResult[] = []
    let padres: number[] = []
	  let pivot_dist
    const rootNode = await NodeModel.getRoot()
    padres.push(rootNode.id)
    let pivots = await Pivot.getPivots()
    let minDistance = 40000
    let pivot
    for (let i = 0; i < pivots.length; i++ ) {
      let distance = await service.distance(_code, pivots[i])
      if (distance < minDistance) {
        minDistance = distance
        pivot = i
      }
    }
    padres = (await NodeModel.getChildren(minDistance - _range, minDistance + _range, padres)).map(e => e.id )
    for (let i = 0; i < pivots.length; i++ ) {
      pivot_dist = await service.distance(_code, pivots[i])
      padres = (await NodeModel.getChildren(pivot_dist - _range, pivot_dist + _range, padres)).map(e => e.id )
      if (padres.length === 0) {
        return []
      }
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
