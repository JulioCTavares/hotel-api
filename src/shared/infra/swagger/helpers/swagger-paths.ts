type pathParams = [property: string, type: any, options?: any][]

export class SwaggerPath {
  static paths(pathParams: pathParams) {
    return pathParams.map(([property, type, required = false]) => ({
      in: 'path',
      name: property,
      schema: type,
      required,
    }))
  }
}
