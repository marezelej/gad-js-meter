import { BaseHandler } from 'App/Distance/Manhattan/Handler/NodeHandler'

export function isInsideLoop(ancestors) {
  return ancestors.slice(-2)[0]?.type === 'ForStatement'
}

export class UpdateExpression extends BaseHandler {
  public handle({ node, ancestors }): void {
    if (isInsideLoop(ancestors)) {
      return
    }
    if (node.operator === '++') {
      this.vector.sumOpCount++
    }
    if (node.operator === '--') {
      this.vector.diffOpCount++
    }
  }
}
export class AssignmentExpression extends BaseHandler {
  public handle({ node, ancestors }): void {
    if (isInsideLoop(ancestors)) {
      return
    }
    if (node.operator === '+=') {
      this.vector.sumOpCount++
    }
    if (node.operator === '-=') {
      this.vector.diffOpCount++
    }
    if (node.operator === '*=') {
      this.vector.prodOpCount++
    }
    if (node.operator === '/=') {
      this.vector.divOpCount++
    }
  }
}
