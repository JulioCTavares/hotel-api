import {
  SwaggerContents,
  SwaggerPath,
  SwaggerTypes,
  SwaggerQuery,
  SwaggerSchemas,
  defaultFilterParams,
  defaultResponses,
  SwaggerResponse,
} from '@/shared/infra/swagger/helpers'

export const userTag = 'Users'

const userObject = SwaggerTypes.object(true, [
  ['id', SwaggerTypes.uuid(true)],
  ['name', SwaggerTypes.string(true)],
  ['email', SwaggerTypes.email(true)],
  ['password', SwaggerTypes.string(true)],
  ['phone', SwaggerTypes.string(false)],
  ['city', SwaggerTypes.string(false)],
  ['state', SwaggerTypes.string(false)],
  ['country', SwaggerTypes.string(false)],
  ['birthDate', SwaggerTypes.dateTime(false)],
  ['created_at', SwaggerTypes.dateTime(true)],
  ['updated_at', SwaggerTypes.dateTime(true)],
])

export const userSchema = SwaggerSchemas.create('User', [
  ['id', SwaggerTypes.uuid(true)],
  ['name', SwaggerTypes.string(true)],
  ['email', SwaggerTypes.email(true)],
  ['password', SwaggerTypes.string(true)],
  ['phone', SwaggerTypes.string(false)],
  ['city', SwaggerTypes.string(false)],
  ['state', SwaggerTypes.string(false)],
  ['country', SwaggerTypes.string(false)],
  ['birthDate', SwaggerTypes.dateTime(false)],
  ['created_at', SwaggerTypes.dateTime(true)],
  ['updated_at', SwaggerTypes.dateTime(true)],
])

export const userPaths = {
  '/users': {
    get: {
      tags: [userTag],
      summary: 'Get Users',
      produces: ['application/json'],
      parameters: [
        ...SwaggerQuery.params([
          ['name', SwaggerTypes.string()],
          ['email', SwaggerTypes.string()],
          ['phone', SwaggerTypes.string()],
          ['city', SwaggerTypes.string()],
          ['state', SwaggerTypes.string()],
          ['country', SwaggerTypes.string()],
          ['birthDate', SwaggerTypes.dateTime()],
        ]),
        ...defaultFilterParams,
      ],
      responses: {
        ...SwaggerResponse.ok(
          'Users found',
          SwaggerContents.applicationJson([
            ['items', SwaggerTypes.array(true, userObject, 100)],
            ['totalItemsListed', SwaggerTypes.integer()],
            ['totalItems', SwaggerTypes.integer()],
          ]),
        ),
        ...defaultResponses,
      },
    },
    post: {
      tags: [userTag],
      summary: 'Create a new user',
      produces: ['application/json'],
      requestBody: {
        content: SwaggerContents.applicationJson([
          ['name', SwaggerTypes.string(true)],
          ['email', SwaggerTypes.string(true)],
          ['password', SwaggerTypes.string(true)],
          ['phone', SwaggerTypes.string()],
          ['city', SwaggerTypes.string()],
          ['state', SwaggerTypes.string()],
          ['country', SwaggerTypes.string()],
          ['birthDate', SwaggerTypes.dateTime()],
        ]),
      },
      responses: {
        ...SwaggerResponse.created(
          'User created',
          SwaggerContents.applicationJson([], [], userObject),
        ),
        ...defaultResponses,
      },
    },
  },
  '/users/{id}': {
    get: {
      tags: [userTag],
      summary: 'Get a User',
      produces: ['application/json'],
      parameters: SwaggerPath.paths([['id', SwaggerTypes.uuid(), true]]),
      responses: {
        ...SwaggerResponse.ok(
          'User found',
          SwaggerContents.applicationJson([], [], userObject),
        ),
        ...SwaggerResponse.notFound('User not found'),
        ...defaultResponses,
      },
    },
    patch: {
      tags: [userTag],
      summary: 'Update a User by id',
      produces: ['application/json'],
      parameters: SwaggerPath.paths([['id', SwaggerTypes.uuid(), true]]),
      requestBody: {
        content: SwaggerContents.applicationJson([
          ['name', SwaggerTypes.string()],
          ['email', SwaggerTypes.string()],
          ['password', SwaggerTypes.string()],
          ['phone', SwaggerTypes.string()],
          ['city', SwaggerTypes.string()],
          ['state', SwaggerTypes.string()],
          ['country', SwaggerTypes.string()],
          ['birthDate', SwaggerTypes.dateTime()],
        ]),
      },
      responses: {
        ...SwaggerResponse.ok(
          'User updated',
          SwaggerContents.applicationJson([], [], userObject),
        ),
        ...SwaggerResponse.notFound('User not found'),
        ...defaultResponses,
      },
    },
    delete: {
      tags: ['Users'],
      summary: 'Delete a User by id',
      produces: ['application/json'],
      parameters: SwaggerPath.paths([['id', SwaggerTypes.uuid(), true]]),
      responses: {
        ...SwaggerResponse.noContent(),
        ...SwaggerResponse.notFound('User not found'),
        ...defaultResponses,
      },
    },
  },
}
