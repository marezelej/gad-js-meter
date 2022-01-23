import { BaseHandler } from 'App/Distance/Manhattan/Handler/NodeHandler'
import { CodeVector } from 'App/Distance/Manhattan/MetricVectorsDistance'

export class IfCountCheck {
  public static check(vector: CodeVector, node, ancestors) {
    if (!IfCountCheck.isCondition(node)) {
      return
    }
    vector.ifCount++
    this.handleTest(vector, node.test)
    const loopAncestors = ancestors.filter((ancestor) => this.isCondition(ancestor)).length - 1
    if (loopAncestors === 0) {
      vector.simpleIfCount++
    } else if (loopAncestors === 1) {
      vector.doubleIfCount++
    } else {
      vector.multipleIfCount++
    }
  }
  protected static isCondition(node): boolean {
    return ['IfStatement', 'ConditionalExpression'].includes(node.type)
  }
  protected static handleTest(vector, node) {
    if (node.type === 'LogicalExpression') {
      vector.ifCount++
      // @ts-ignore
      this.handleTest(vector, node.left)
      // @ts-ignore
      this.handleTest(vector, node.right)
    }
  }
}

export class IfStatement extends BaseHandler {
  public handle({ node, ancestors }) {
    IfCountCheck.check(this.vector, node, ancestors)
  }
}
