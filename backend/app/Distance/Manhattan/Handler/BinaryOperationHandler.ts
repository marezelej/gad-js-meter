import {BaseHandler} from 'App/Distance/Manhattan/Handler/NodeHandler';

export class UpdateExpression extends BaseHandler {
  handle({node}): void {
    if (node.operator === '++') {
      this.vector.sumOpCount++
    }
    if (node.operator === '--') {
      this.vector.diffOpCount++
    }
  }
}
export class AssignmentExpression extends BaseHandler {
  handle({node}): void {
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
