import {BaseHandler} from 'App/Distance/Euclidean/Handler/NodeHandler'
import {Node} from 'acorn'

export class VariableDeclaration extends BaseHandler  {
  handle(_node: Node) {
    this.vector.variableCount++
  }
}
