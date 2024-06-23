import { SwaggerSchemas } from './swagger-schemas'
import { SwaggerTypes } from './swagger-types'

export const errorSchema = SwaggerSchemas.create('Error', [
  ['type', SwaggerTypes.string(true)],
  ['code', SwaggerTypes.string(true)],
  ['data', SwaggerTypes.string(false)],
  ['message', SwaggerTypes.string(false)],
])

const errorContent = {
  content: {
    'application/json': {
      schema: {
        $ref: '#/components/schemas/Error',
      },
    },
  },
}

export class SwaggerResponse {
  static ok(description: string = 'OK', content?: any) {
    return {
      200: {
        description,
        ...(content ? { content } : {}),
      },
    }
  }

  static badRequest(description: string = 'BAD REQUEST') {
    return {
      400: {
        description,
        ...errorContent,
      },
    }
  }

  static serverError(description: string = 'SERVER ERROR') {
    return {
      500: {
        description,
        ...errorContent,
      },
    }
  }

  static notFound(description: string = 'NOT FOUND') {
    return {
      404: {
        description,
        ...errorContent,
      },
    }
  }

  static created(description: string = 'OK', content?: any) {
    return {
      201: {
        description,
        ...(content ? { content } : {}),
      },
    }
  }

  static noContent(description: string = 'No body return') {
    return {
      204: {
        description,
      },
    }
  }
}

export const defaultResponses = {
  ...SwaggerResponse.badRequest(),
  ...SwaggerResponse.serverError(),
}
