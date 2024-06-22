import { HttpResponse } from './http-response'

export interface HttpController<T = any> {
  handle(request: T): Promise<HttpResponse>
}
