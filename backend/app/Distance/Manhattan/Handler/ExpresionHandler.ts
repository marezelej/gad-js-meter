import { BaseHandler } from 'App/Distance/Manhattan/Handler/NodeHandler'
import { checkLoop, isLoopCallExpression } from './LoopHandler'
import { IfCountCheck } from 'App/Distance/Manhattan/Handler/ChoiceHandler'
import { isInsideLoop } from 'App/Distance/Manhattan/Handler/BinaryOperationHandler'

export class CallExpression extends BaseHandler {
  public handle({ node, ancestors }) {
    checkLoop(node, ancestors, this.vector)
    this.checkHasArrays(node)
  }

  private checkHasArrays(node) {
    if (this.vector.hasArrays) {
      return
    }
    const arrayCallExpressions = ['slice', 'add']
    if (isLoopCallExpression(node) || arrayCallExpressions.includes(node.callee?.property?.name)) {
      this.vector.hasArrays = 1
    }
  }
}

export class ArrayExpression extends BaseHandler {
  public handle() {
    this.vector.hasArrays = 1
  }
}

export class BinaryExpression extends BaseHandler {
  public handle({ node, ancestors }) {
    if (isInsideLoop(ancestors)) {
      return
    }
    if (node.operator === '+') {
      this.vector.sumOpCount++
    } else if (node.operator === '-') {
      this.vector.diffOpCount++
    } else if (node.operator === '/') {
      this.vector.divOpCount++
    } else if (node.operator === '*') {
      this.vector.prodOpCount++
    }
  }
}

export class ConditionalExpression extends BaseHandler {
  public handle({ node, ancestors }): void {
    IfCountCheck.check(this.vector, node, ancestors)
  }
}

export class MemberExpression extends BaseHandler {
  public handle({ node }): void {
    if (node.computed) {
      this.vector.hasArrays = 1
    }
  }
}
