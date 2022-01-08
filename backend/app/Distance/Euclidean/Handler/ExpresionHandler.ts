import {BaseHandler} from 'App/Distance/Euclidean/Handler/NodeHandler'
import {Node} from 'acorn'

export class CallExpression extends BaseHandler  {
  handle({ node, ancestors }) {
    this.checkRecursion(node, ancestors)
  }

  private checkRecursion(node: Node, ancestors: Node[]) {
    // @ts-ignore
    const functionName = ancestors[1].id.name
    // @ts-ignore
    if (functionName === node.callee.name) {
      this.vector.loopCount++
    }
  }
}

export class ArrayExpression extends BaseHandler {
  handle() {
    this.vector.hasArrays = 1;
  }
}
