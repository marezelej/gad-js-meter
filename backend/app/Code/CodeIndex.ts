import service from '@ioc:GAD/Distance'
import {difference, first, sampleSize} from 'lodash'
import {unique} from '@adonisjs/lucid/build/src/utils'

interface Node {
  distance: number
  children: Node | null
}

export default class CodeIndex {
  public async getPivots(
    codeSpace: string[],
    nPivots: number,
    kSample: number,
    aPairs: number
  ): Promise<string[]> {
    let pivots: string[] = []
    while (pivots.length < nPivots) {
      let sample = sampleSize(difference(codeSpace, pivots), kSample)
      let pairs = sampleSize(difference(codeSpace, [...pivots, ...sample]), aPairs * 2)
      let winner = sample[0]
      let maxAverage = 0
      for (let candidate of sample) {
        let average = await this.candidateMu(pivots, candidate, pairs)
        if (average > maxAverage) {
          maxAverage = average
          winner = candidate
        }
      }
      pivots.push(winner)
    }
    return unique(pivots)
  }

  public async candidateMu(pivots: string[], candidate: string, pairs: string[]): Promise<number> {
    let i = 0
    let total = 0
    const candidateGroup = pivots.concat(candidate)
    while (i < pairs.length) {
      let aElement = pairs[i]
      let bElement = pairs[i + 1]
      let maxDiff = 0
      for (let j = 0; j < candidateGroup.length; j++) {
        const aDistance = await service.distance(aElement, candidateGroup[j])
        const bDistance = await service.distance(bElement, candidateGroup[j])
        let diff = Math.abs(aDistance - bDistance)
        if (diff > maxDiff) {
          maxDiff = diff
        }
      }
      total += maxDiff
      i += 2
    }
    return total / (pairs.length / 2)
  }

  async getNodes(pivots: string[], code: string): Promise<Node> {
    const root: Node = {distance: await service.distance(code, first(pivots)!), children: null}
    let parent: Node = root
    for (const pivot of pivots.slice(1)) {
      parent.children = {
        distance: await service.distance(code, pivot),
        children: null
      }
      parent = parent.children
    }
    return root
  }
}
