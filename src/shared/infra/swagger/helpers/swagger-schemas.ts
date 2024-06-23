type properties = [property: string, type: any][]

export class SwaggerSchemas {
  static create(schemaName: string, properties: properties) {
    return {
      [schemaName]: {
        type: 'object',
        properties: Object.fromEntries(properties),
      },
    }
  }
}
