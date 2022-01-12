import service from '@ioc:GAD/Distance'
import FunctionCode from 'App/Models/FunctionCode'
import Pivot from 'App/Models/Pivot'
import {default as NodeModel} from 'App/Models/Node'
import {orderBy} from "lodash";
import {CodeVector, toVector} from "App/Distance/Manhattan/MetricVectorsDistance";

interface SearchResult {
  code: string
  distance: number
  vector: CodeVector
}

export default class CodeRangeSearch {
  async search(code: string, range: number, limit: number): Promise<SearchResult[]> {
    let results: SearchResult[] = []
    let parentKeys: number[] = []
    const rootNode = await NodeModel.getRoot()
    parentKeys.push(rootNode.id)
    let pivots = await Pivot.getPivots()
    for (const pivotCode of pivots) {
      const pivotDistance = await service.distance(code, pivotCode)
      parentKeys = (await NodeModel.getChildren(pivotDistance - range, pivotDistance + range, parentKeys)).map(e => e.id)
      if (parentKeys.length === 0) {
        return []
      }
    }
    for (const fCode of await FunctionCode.getByNodes(parentKeys)) {
      let distance = await service.distance(code, fCode.code)
      if (distance <= range) {
        results.push({
          code: fCode.code,
          distance: distance,
          vector: toVector(fCode.code)
        })
      }
    }
    return orderBy(results, 'distance').slice(0, limit)
  }
}
