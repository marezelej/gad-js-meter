import {Parser} from 'acorn'
import {ancestor, AncestorVisitors} from 'acorn-walk'
import buildVisitor from 'App/Distance/Euclidean/DefaultVisitor'

export class CodeVector {
  loopCount = 0
  variableCount = 0
  paramsCount = 0
  recursiveCallCount = 0
  maxTreeDeep = 0
}

export default class EuclideanDistance {
  async distance(a: string, b: string): Promise<number> {
    const aVector = Object.values(this.toVector(a))
    const bVector = Object.values(this.toVector(b))
    const distance = Math.hypot(...aVector.map((aValue, key) => (aValue - bVector[key])))
    if (distance === 0) return distance
    return Math.floor(distance * 10 - 10)
  }

  public toVector(code: string): CodeVector {
    const tree = Parser.parse(code, {ecmaVersion: 'latest'})
    const vector = new CodeVector()
    ancestor(tree, this.getVisitors(vector))
    return vector
  }

  // noinspection JSMethodCanBeStatic
  private getVisitors(vector: CodeVector): AncestorVisitors<any> {
    // @ts-ignore
    return buildVisitor(vector)
  }
}
