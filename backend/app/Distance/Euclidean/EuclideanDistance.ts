import {Parser} from 'acorn'
import {SimpleVisitors, simple} from 'acorn-walk'
import buildVisitor from 'App/Distance/Euclidean/DefaultVisitor'

export class CodeVector {
  loopCount = 0
  variableCount = 0
  paramsCount = 0
}

export default class EuclideanDistance {
  async distance(a: string, b: string): Promise<number> {
    const aVector = Object.values(this.toVector(a))
    const bVector = Object.values(this.toVector(b))
    return Math.hypot(...aVector.map((aValue, key) => (aValue - bVector[key])))
  }

  public toVector(code: string): CodeVector {
    const tree = Parser.parse(code, {ecmaVersion: 'latest'})
    const vector = new CodeVector()
    simple(tree, this.getVisitors(vector))
    return vector
  }

  // noinspection JSMethodCanBeStatic
  private getVisitors(vector: CodeVector): SimpleVisitors<any> {
    // @ts-ignore
    return buildVisitor(vector)
  }
}
