import NodeVisitor from 'App/Distance/Euclidean/NodeVisitor'
import {CodeVector} from 'App/Distance/Euclidean/EuclideanDistance'
import {
  DoWhileStatement,
  ForStatement,
  ForInStatement,
  WhileStatement
} from 'App/Distance/Euclidean/Handler/LoopHandler'
import {FunctionDeclaration, VariableDeclaration} from 'App/Distance/Euclidean/Handler/DeclarationHandler'
import {Node} from 'acorn'
import {CallExpression, FunctionExpression} from 'App/Distance/Euclidean/Handler/ExpresionHandler'

export default function buildVisitor(vector: CodeVector) {
  const visitor = (new NodeVisitor)
    .addHandler(new ForStatement(vector))
    .addHandler(new ForInStatement(vector))
    .addHandler(new WhileStatement(vector))
    .addHandler(new DoWhileStatement(vector))
    .addHandler(new VariableDeclaration(vector))
    .addHandler(new FunctionDeclaration(vector))
    .addHandler(new FunctionExpression(vector))
    .addHandler(new CallExpression(vector))
  // @ts-ignore
  return new Proxy({}, {
    get: function(_target, name: string){
      return function (node: Node, ancestors: Node[]) {
        if (ancestors.length > vector.maxTreeDeep) {
          vector.maxTreeDeep = ancestors.length
        }
        visitor.handle(name, { node, ancestors })
      }
    }
  })
}
