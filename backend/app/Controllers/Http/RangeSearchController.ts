import {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'
import CodeRangeSearch from "App/Code/CodeRangeSearch";

export default class RangeSearchController {
  async handle({view, request}: HttpContextContract) {
    const data = {
      code: request.input('code', RangeSearchController.defaultCode()),
      range: request.input('range', 10),
      limit: request.input('limit', 10),
      showResults: request.input('code') || false,
      results: await RangeSearchController.search(request.input('code'), request.input('range'), request.input('limit'))
    }
    return view.render('welcome', data)
  }

  private static defaultCode(): string {
    return `function suma(a, b) {\n\treturn a + b;\n}`
  }

  private static async search(code: string, range: number, limit: number) {
    if (!code) {
      return []
    }
    const service = new CodeRangeSearch()
    return service.search(code, range, limit)
  }
}
