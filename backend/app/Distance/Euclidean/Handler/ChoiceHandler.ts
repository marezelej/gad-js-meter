import {BaseHandler} from 'App/Distance/Euclidean/Handler/NodeHandler'
import {Node} from 'acorn'

export class IfStatement extends BaseHandler {
  handle({ node, ancestors }) {
    this.vector.ifCount++
    this.handleTest(node.test)
    const loopAncestors = ancestors.filter(ancestor => ancestor.type === 'IfStatement').length - 1
    if (loopAncestors === 0) {
      this.vector.simpleIfCount++;
    }
    else if (loopAncestors === 1) {
      this.vector.doubleIfCount++;
    }
    else {
      this.vector.multipleIfCount++;
    }
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
