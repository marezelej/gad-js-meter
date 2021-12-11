import service from '@ioc:GAD/Distance'

interface Node {
  distance: number
  parent: Node | null
}

export default class CodeIndex {
  async getPivots(codeSpace: string[], nPivots: number, kSample: number, aPairs: number): Promise<string[]> {
    // TODO
  }

  async getNodes(pivots: string[], code: string): Promise<Node> {
    // TODO
    const distance = service.distance(code, pivots[0])
    console.log(distance)
  }
}
