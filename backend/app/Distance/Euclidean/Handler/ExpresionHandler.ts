import {BaseHandler} from 'App/Distance/Euclidean/Handler/NodeHandler'
import {Node} from 'acorn'
import {CodeVector} from "App/Distance/Euclidean/EuclideanDistance";
import {FunctionDeclaration} from "App/Distance/Euclidean/Handler/DeclarationHandler";

export class FunctionExpression extends BaseHandler  {
  handle({ node: _node }) {
    console.log(_node)
  }
}

export class CallExpression extends BaseHandler  {
  constructor(protected vector: CodeVector, protected functionDeclaration: FunctionDeclaration) {super(vector)}
  handle({ node, ancestors }) {
    this.checkRecursion(node, ancestors)
  }

  private checkRecursion(node: Node, ancestors: Node[]) {
    // @ts-ignore
    const functionName = ancestors[1].id.name
    // @ts-ignore
    if (functionName === node.callee.name) {
      this.vector.loopCount++
      this.vector.recursiveCallCount++
    }
  }
}
