import NodeVisitor from 'App/Distance/Euclidean/NodeVisitor'
import {CodeVector} from 'App/Distance/Euclidean/EuclideanDistance'
import {
  DoWhileStatement,
  ForStatement,
  ForInStatement,
  WhileStatement
} from 'App/Distance/Euclidean/Handler/LoopHandler'
import {VariableDeclaration} from 'App/Distance/Euclidean/Handler/DeclarationHandler'
import {Node} from 'acorn'

export default function buildVisitor(vector: CodeVector) {
  const visitor = (new NodeVisitor)
    .addHandler(new ForStatement(vector))
    .addHandler(new ForInStatement(vector))
    .addHandler(new WhileStatement(vector))
    .addHandler(new DoWhileStatement(vector))
    .addHandler(new VariableDeclaration(vector))
  // @ts-ignore
  return new Proxy({}, {
    get: function(_target, name: string){
      return function (node: Node) {
        visitor.handle(name, node)
      }
    }
  })
}
