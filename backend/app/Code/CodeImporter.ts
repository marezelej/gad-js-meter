const {Parser} = require('acorn')
const walk = require('acorn-walk')
const fs = require('fs')
const path = require('path')
const fsPromise = require('fs').promises
const async = require('async')

export default class CodeImporter {
  async walkDir(dir: string): Promise<string[]> {
    let results: string[] = []
    const list = fs.readdirSync(dir)
    let pending = list.length
    if (!pending) return results
    await Promise.all(list.map(async (file) => {
      file = path.resolve(dir, file)
      const stat = await fsPromise.stat(file)
      if (stat && stat.isDirectory()) {
        const subResults = await this.walkDir(file)
        results.push(...subResults)
        if (!--pending) return
      } else {
        results.push(file)
        if (!--pending) return
      }
    }))
    return results
  }

  getFunctions(code) {
    const functions: string[] = []
    const tree = Parser.parse(code)
    walk.simple(tree, {
      FunctionDeclaration(node) {
        functions.push('function ' + code.substring(node.id.start, node.end))
      },
      ArrowFunctionExpression(node) {
        functions.push('const arrow = ' + code.substring(node.start, node.end))
      }
    })
    return functions
  }

  async handle(dir: string, limit: number): Promise<string[]> {
    const files = await this.walkDir(dir)
    const functions: string[] = []
    await async.mapLimit(files.slice(0, limit), 6000, async (filename) => {
      if (filename.split('.').pop() === 'js') {
        return fsPromise.readFile(filename, 'utf8')
          .then((content) => {
            try {
              const newFunctions = this.getFunctions(content)
              console.log(`Found ${newFunctions.length} functions at file ${filename}`)
              functions.push(...newFunctions)
            } catch (error) {
              console.log(`Error parsing file ${filename}`)
            }
          }).catch(console.log)
      }
    })
    return functions
  }
}
