import {BaseHandler} from 'App/Distance/Manhattan/Handler/NodeHandler'
import { checkLoop } from './LoopHandler'

export class CallExpression extends BaseHandler  {
  handle({ node, ancestors }) {
    checkLoop(node, ancestors, this.vector)
  }
}

export class ArrayExpression extends BaseHandler {
  handle() {
    this.vector.hasArrays = 1;
  }
}

export class BinaryExpression extends BaseHandler {
  handle({ node }) {
    if (node.operator === "+") {
      this.vector.sumOpCount++;
    }
    else if (node.operator === "-") {
      this.vector.diffOpCount++;
    }
    else if (node.operator === "/") {
      this.vector.divOpCount++;
    }
    else if (node.operator === "*") {
      this.vector.prodOpCount++;
    }
  }
}
