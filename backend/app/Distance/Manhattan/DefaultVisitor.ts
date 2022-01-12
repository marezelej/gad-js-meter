import NodeVisitor from 'App/Distance/Manhattan/NodeVisitor'
import {CodeVector} from 'App/Distance/Manhattan/MetricVectorsDistance'
import {
  DoWhileStatement,
  ForStatement,
  ForInStatement,
  WhileStatement
} from 'App/Distance/Manhattan/Handler/LoopHandler'
import {FunctionDeclaration} from 'App/Distance/Manhattan/Handler/DeclarationHandler'
import {Node} from 'acorn'
import {BinaryExpression , ArrayExpression, CallExpression} from 'App/Distance/Manhattan/Handler/ExpresionHandler'
import {IfStatement} from 'App/Distance/Manhattan/Handler/ChoiceHandler'

export default function buildVisitor(vector: CodeVector) {
  const visitor = (new NodeVisitor)
    .addHandler(new ForStatement(vector))
    .addHandler(new ForInStatement(vector))
    .addHandler(new WhileStatement(vector))
    .addHandler(new DoWhileStatement(vector))
    .addHandler(new FunctionDeclaration(vector))
    .addHandler(new CallExpression(vector))
    .addHandler(new IfStatement(vector))
    .addHandler(new ArrayExpression(vector))
    .addHandler(new BinaryExpression (vector))
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
