import {BaseHandler} from 'App/Distance/Euclidean/Handler/NodeHandler'
import {Node} from 'acorn'

export class FunctionDeclaration extends BaseHandler {
  private isHeader = true

  handle({ node }) {
    this.handleHeader(node)
  }

  private handleHeader(node: Node) {
    if (this.isHeader) {
      // @ts-ignore
      this.vector.paramsCount = node.params.length
      this.isHeader = false
    }
  }
}
