import {
  SwaggerContents,
  SwaggerSchemas,
  SwaggerTypes,
  SwaggerResponse,
  defaultResponses,
} from '@/shared/infra/swagger/helpers'

export const authTag = 'Auth'

export const authUserSchema = SwaggerSchemas.create('AuthUser', [
  ['email', SwaggerTypes.email(true)],
  ['password', SwaggerTypes.string(true)],
])

export const authPaths = {
  '/auth/login': {
    post: {
      tags: [authTag],
      summary: 'Login',
      produces: ['application/json'],
      requestBody: {
        content: SwaggerContents.applicationJson([
          ['email', SwaggerTypes.email(true)],
          ['password', SwaggerTypes.password(true)],
        ]),
      },
      responses: {
        ...SwaggerResponse.ok(
          'Succesfully Logged',
          SwaggerContents.applicationJson([
            ['access_token', SwaggerTypes.string(true)],
            ['refresh_token', SwaggerTypes.string(true)],
            [
              'authUser',
              SwaggerTypes.object(true, [
                ['id', SwaggerTypes.uuid()],
                ['name', SwaggerTypes.string()],
                ['email', SwaggerTypes.email()],
              ]),
            ],
          ]),
        ),
        ...defaultResponses,
      },
    },
  },
  '/auth/forgot-password': {
    post: {
      tags: [authTag],
      summary: 'Login',
      produces: ['application/json'],
      requestBody: {
        content: SwaggerContents.applicationJson([
          ['email', SwaggerTypes.email(true)],
        ]),
      },
      responses: {
        ...SwaggerResponse.ok(),
        ...defaultResponses,
      },
    },
  },
}
