import {BaseHandler} from 'App/Distance/Manhattan/Handler/NodeHandler'
import {Node} from 'acorn'
import { checkLoop } from './LoopHandler'

export class CallExpression extends BaseHandler  {
  handle({ node, ancestors }) {
    this.checkRecursion(node, ancestors)
    checkLoop(ancestors, this.vector)
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