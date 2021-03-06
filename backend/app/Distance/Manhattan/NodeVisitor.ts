import {Node} from 'acorn'
import NodeHandler from 'App/Distance/Manhattan/Handler/NodeHandler'

export default class NodeVisitor {
  handlers = {}

  public addHandler(handler: NodeHandler) {
    const type = handler.constructor.name
    this.handlers[type] = (this.handlers[type] || []).concat(handler)
    return this
  }

  public handle(type: string, params: { node: Node, ancestors: Node[] }) {
    (this.handlers[type] || [])
      .forEach((h) => h.handle(params))
  }
}
