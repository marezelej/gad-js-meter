import {BaseHandler} from 'App/Distance/Euclidean/Handler/NodeHandler'
import {Node} from 'acorn'

export class IfStatement extends BaseHandler {
  handle({ node }) {
    this.vector.ifCount++
    this.handleTest(node.test)
  }

  private handleTest(node: Node) {
    if (node.type === 'LogicalExpression') {
      this.vector.ifCount++
      // @ts-ignore
      this.handleTest(node.left)
      // @ts-ignore
      this.handleTest(node.right)
    }
  }
}

// TODO Handle case -> switch
