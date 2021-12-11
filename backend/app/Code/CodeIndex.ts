import service from '@ioc:GAD/Distance'

interface Node {
  distance: number
  parent: Node | null
}

export default class CodeIndex {
  public async getPivots(
    codeSpace: string[],
    nPivots: number,
    kSample: number,
    aPairs: number
  ): Promise<any> {
    let pivots
    let sample
    let pairs
    let candidate = ''
    let average
    let maxAverage = 0
    let winner
    while (pivots.length < nPivots) {
      let auxSample = codeSpace.filter((e) => !pivots.includes(e))
      if (auxSample) {
        for (let i = 0; i < kSample; i++) {
          sample.push(auxSample[Math.floor(Math.random() * auxSample.length)])
        }
      }
      let auxPairs = codeSpace.filter((e) => !pivots.includes(e) && !sample.includes(e))
      if (auxSample) {
        for (let i = 0; i < aPairs * 2; i++) {
          pairs.push(auxPairs[Math.floor(Math.random() * auxPairs.length)])
        }
      }
      winner = sample[0]
      sample.forEach((e) => {
        average = this.candidateMu(pivots, candidate, pairs)
        if (average > maxAverage) {
          maxAverage = average
          winner = candidate
        }
      })
      return pivots
    }
  }

  public async candidateMu(pivots: string[], candidate: string, pairs: string[]): Promise<Number> {
    let pivot
    let i = 0
    let Aelement
    let Belement
    let maxDiff
    let diff
    let total = 0
    pivot = pivots.concat(candidate)
    while (i < pairs.length) {
      Aelement = pairs[i]
      Belement = pairs[i + 1]
      maxDiff = 0
      for (let j = 0; j < pivots.length; j++) {
        const aDistnace = await service.distance(Aelement, pivots[j])
        const bDistance = await service.distance(Belement, pivots[j])
        diff = Math.abs(aDistnace - bDistance)
        if (diff > maxDiff) {
          maxDiff = diff
        }
      }
      total += maxDiff
      i += 2
    }
    return total / (pairs.length / 2)
  }

  public async getNodes(pivots: string[], code: string): Promise<Node> {
    // TODO
    const distance = service.distance(code, pivots[0])
    console.log(distance)
  }
}
