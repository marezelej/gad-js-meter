import { Node } from 'acorn'
import {BaseHandler} from 'App/Distance/Manhattan/Handler/NodeHandler'

export class LoopStatement extends BaseHandler  {
  handle({ node: _node, ancestors }) {
    checkLoop(ancestors, this.vector)
  }

}

export class ForStatement extends LoopStatement  {
}

export class ForInStatement extends LoopStatement  {
}

export class WhileStatement extends LoopStatement  {
}

export class DoWhileStatement extends LoopStatement  {
}

export function checkLoop (ancestors: Node[], vector) {
  const looopfunctions = ['forEach', 'filter', 'map', 'find', 'includes', 'every', 'reduce', 'reverse', 'some', 'sort', 'findIndex']
  vector.loopCount++
    const loopAncestors = ancestors.filter(ancestor => 
      ancestor.type === 'ForStatement' ||  
      ancestor.type === 'ForInStatement' ||
      ancestor.type === 'WhileStatement' || 
      (ancestor.type === 'CallExpression' && looopfunctions.includes(ancestor.callee?.property?.name)) ||
      ancestor.type === 'DoWhileStatement').length - 1
    if (loopAncestors === 0) {
      vector.simpleLoopCount++;
    }
    else if (loopAncestors === 1) {
      vector.doubleLoopCount++;
    }
    else {
      vector.multipleLoopCount++;
    }
}
