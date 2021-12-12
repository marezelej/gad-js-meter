import NodeVisitor from 'App/Distance/Euclidean/NodeVisitor'
import {CodeVector} from 'App/Distance/Euclidean/MetricVectorsDistance'
import {
  DoWhileStatement,
  ForStatement,
  ForInStatement,
  WhileStatement
} from 'App/Distance/Euclidean/Handler/LoopHandler'
import {FunctionDeclaration} from 'App/Distance/Euclidean/Handler/DeclarationHandler'
import {Node} from 'acorn'
import {CallExpression, FunctionExpression} from 'App/Distance/Euclidean/Handler/ExpresionHandler'
import {IfStatement} from 'App/Distance/Euclidean/Handler/ChoiceHandler'

export default function buildVisitor(vector: CodeVector) {
  const visitor = (new NodeVisitor)
    .addHandler(new ForStatement(vector))
    .addHandler(new ForInStatement(vector))
    .addHandler(new WhileStatement(vector))
    .addHandler(new DoWhileStatement(vector))
    .addHandler(new FunctionDeclaration(vector))
    .addHandler(new FunctionExpression(vector))
    .addHandler(new CallExpression(vector))
    .addHandler(new IfStatement(vector))
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
