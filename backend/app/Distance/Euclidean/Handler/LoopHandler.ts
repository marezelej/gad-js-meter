import {Node} from 'acorn'
import {BaseHandler} from 'App/Distance/Euclidean/Handler/NodeHandler'

export class ForStatement extends BaseHandler  {
  handle(_node: Node) {
    this.vector.loopCount++
  }
}

export class ForInStatement extends BaseHandler  {
  handle(_node: Node) {
    this.vector.loopCount++
  }
}

export class WhileStatement extends BaseHandler  {
  handle(_node: Node) {
    this.vector.loopCount++
  }
}

export class DoWhileStatement extends BaseHandler  {
  handle(_node: Node) {
    this.vector.loopCount++
  }
}
