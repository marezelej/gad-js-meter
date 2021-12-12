import {BaseHandler} from 'App/Distance/Euclidean/Handler/NodeHandler'

export class ForStatement extends BaseHandler  {
  handle({ node: _node }) {
    this.vector.loopCount++
  }
}

export class ForInStatement extends BaseHandler  {
  handle({ node: _node }) {
    this.vector.loopCount++
  }
}

export class WhileStatement extends BaseHandler  {
  handle({ node: _node }) {
    this.vector.loopCount++
  }
}

export class DoWhileStatement extends BaseHandler  {
  handle({ node: _node }) {
    this.vector.loopCount++
  }
}
