export const securitySchemes = {
  BearerAuth: {
    type: 'http',
    scheme: 'bearer',
  },
}

export const security = [{ BearerAuth: [] }]
