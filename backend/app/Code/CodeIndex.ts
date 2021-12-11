import service from '@ioc:GAD/Distance'

interface Node {
  distance: number
  children: Node | null
}

export default class CodeIndex {
  async getPivots(codeSpace: string[], nPivots: number, kSample: number, aPairs: number): Promise<string[]> {
    // TODO
  }

  async getNodes(pivots: string[], code: string): Promise<Node> {
    const root: Node = { distance: await service.distance(code, pivots.shift()!), children: null }
    let parent: Node = root
    for (const pivot of pivots) {
      parent.children = {
        distance: await service.distance(code, pivot),
        children: null
      }
      parent = parent.children
    }
    return root
  }
}
