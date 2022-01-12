import {Parser} from 'acorn'
import {ancestor, AncestorVisitors} from 'acorn-walk'
import buildVisitor from 'App/Distance/Manhattan/DefaultVisitor'
import {sum} from 'lodash'

export class CodeVector {
  loopCount = 0
  simpleLoopCount = 0 // sin nivel de anidamiento
  doubleLoopCount = 0 // 1 nivel de anidamiento
  multipleLoopCount = 0 // 2 o más niveles de anidamiento
  sumOpCount = 0
  diffOpCount = 0
  divOpCount = 0
  prodOpCount = 0
  concatOpCount = 0
  paramsCount = 0 // Tiene más importancia, podríamos dar más peso (5 por ejemplo)
  maxTreeDeep = 0
  ifCount = 0
  simpleIfCount = 0 // sin nivel de anidamiento
  doubleIfCount = 0 // 1 nivel de anidamiento
  multipleIfCount = 0 // 2 o más niveles de anidamiento
  hasArrays = 0 // Utilizar un peso para darle más importancia, como 10 por ejemplo
}

export default class MetricVectorsDistance {
  async distance(a: string, b: string): Promise<number> {
    const aVector = Object.values(this.toVector(a))
    const bVector = Object.values(this.toVector(b))
    const wVector = Object.values(this.getWeightVector())
    return sum(aVector.map((aValue, key) => Math.abs(aValue - bVector[key]) * wVector[key]))
  }

  protected getWeightVector(): CodeVector {
    return {
      loopCount: 1,
      simpleLoopCount: 1,
      doubleLoopCount: 1,
      multipleLoopCount: 1,
      sumOpCount: 1,
      diffOpCount: 1,
      divOpCount: 1,
      prodOpCount: 1,
      concatOpCount: 1,
      paramsCount: 1,
      maxTreeDeep: 1,
      ifCount: 1,
      simpleIfCount: 1,
      doubleIfCount: 1,
      multipleIfCount: 1,
      hasArrays: 10,
    }
  }

  public toVector(code: string): CodeVector {
    const vector = new CodeVector()
    try{
      const tree = Parser.parse(code, {ecmaVersion: 'latest'})
      ancestor(tree, this.getVisitors(vector))
    } catch (e) {
      console.log('Exception parsing code...')
      console.log(e)
      console.log(code)
    }
    return vector
  }

  // noinspection JSMethodCanBeStatic
  private getVisitors(vector: CodeVector): AncestorVisitors<any> {
    // @ts-ignore
    return buildVisitor(vector)
  }
}

export function toVector(code: string): CodeVector {
  return (new MetricVectorsDistance).toVector(code)
}