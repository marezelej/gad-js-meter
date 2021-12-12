import {BaseHandler} from 'App/Distance/Euclidean/Handler/NodeHandler'
import {Node} from 'acorn'

export class VariableDeclaration extends BaseHandler  {
  handle(_node: Node) {
    this.vector.variableCount++
  }
}

export class FunctionDeclaration extends BaseHandler  {
  private isHeader = true
  handle(node: Node) {
    if (this.isHeader) {
      // @ts-ignore
      this.vector.paramsCount = node.params.length
      this.isHeader = false
    }
  }
}
