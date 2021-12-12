import {Node} from 'acorn'
import {CodeVector} from 'App/Distance/Euclidean/EuclideanDistance'

export default interface NodeHandler {
  handle(node: Node): void
}

export abstract class BaseHandler implements NodeHandler {
  constructor(protected vector: CodeVector) {}
  abstract handle(node: Node): void
}
