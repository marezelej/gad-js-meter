import {Parser} from 'acorn'
import {ancestor, AncestorVisitors} from 'acorn-walk'
import buildVisitor from 'App/Distance/Euclidean/DefaultVisitor'
import {sum} from "lodash";

export class CodeVector {
  loopCount = 0
  paramsCount = 0
  maxTreeDeep = 0
  ifCount = 0
}

export default class MetricVectorsDistance {
  async distance(a: string, b: string): Promise<number> {
    const aVector = Object.values(this.toVector(a))
    const bVector = Object.values(this.toVector(b))
    return sum(aVector.map((aValue, key) => Math.abs(aValue - bVector[key])))
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
