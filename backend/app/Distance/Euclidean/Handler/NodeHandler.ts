import {Node} from 'acorn'
import {CodeVector} from 'App/Distance/Euclidean/MetricVectorsDistance'

export default interface NodeHandler {
  handle({ node, ancestors }: { node: Node, ancestors: Node[] }): void
}

export abstract class BaseHandler implements NodeHandler {
  constructor(protected vector: CodeVector) {}
  abstract handle({ node, ancestors }: { node: Node, ancestors: Node[] }): void
}
