import {BaseHandler} from 'App/Distance/Manhattan/Handler/NodeHandler'

export class LoopStatement extends BaseHandler  {
  handle({ node: _node, ancestors }) {
    this.vector.loopCount++
    const loopAncestors = ancestors.filter(ancestor => 
      ancestor.type === 'ForStatement' ||  
      ancestor.type === 'ForInStatement' ||
      ancestor.type === 'WhileStatement' || 
      ancestor.type === 'DoWhileStatement').length - 1
    if (loopAncestors === 0) {
      this.vector.simpleLoopCount++;
    }
    else if (loopAncestors === 1) {
      this.vector.doubleLoopCount++;
    }
    else {
      this.vector.multipleLoopCount++;
    }
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
