import { Node } from 'acorn'
import { BaseHandler } from 'App/Distance/Manhattan/Handler/NodeHandler'

export class LoopStatement extends BaseHandler {
  public handle({ node, ancestors }) {
    checkLoop(node, ancestors, this.vector)
  }
}

export class ForStatement extends LoopStatement {}

export class ForInStatement extends LoopStatement {}

export class WhileStatement extends LoopStatement {}

export class DoWhileStatement extends LoopStatement {}

function isLoopStatement(node) {
  const statements = ['ForStatement', 'ForInStatement', 'WhileStatement', 'DoWhileStatement']
  return statements.includes(node.type)
}

export function isLoopCallExpression(node) {
  const functions = [
    'forEach',
    'filter',
    'map',
    'find',
    'includes',
    'every',
    'reduce',
    'reverse',
    'some',
    'sort',
    'findIndex',
  ]
  return node.type === 'CallExpression' && functions.includes(node.callee?.property?.name)
}

function isRecursiveCall(node, functionName: string) {
  return node.type === 'CallExpression' && functionName === node.callee.name
}

function isLoop(node, functionName: string): boolean {
  return isLoopStatement(node) || isLoopCallExpression(node) || isRecursiveCall(node, functionName)
}

export function checkLoop(node: Node, ancestors: Node[], vector) {
  // @ts-ignore
  const functionName = ancestors[1].id.name
  if (!isLoop(node, functionName)) {
    return
  }
  vector.loopCount++
  const loopAncestorsCont = ancestors.filter((n) => isLoop(n, functionName)).length - 1
  if (loopAncestorsCont === 0) {
    vector.simpleLoopCount++
  } else if (loopAncestorsCont === 1) {
    vector.doubleLoopCount++
  } else {
    vector.multipleLoopCount++
  }
}
