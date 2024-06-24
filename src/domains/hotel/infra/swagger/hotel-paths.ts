import {
  security,
  SwaggerContents,
  SwaggerPath,
  SwaggerSchemas,
  SwaggerTypes,
  SwaggerQuery,
  defaultFilterParams,
  defaultResponses,
  SwaggerResponse,
} from '@/shared/infra/swagger/helpers'

export const hotelTag = 'Hotel'

export const hotelSchema = SwaggerSchemas.create('Hotel', [
  ['id', SwaggerTypes.uuid(true)],
  ['name', SwaggerTypes.string(true)],
  ['city', SwaggerTypes.string(true)],
  ['state', SwaggerTypes.string(true)],
  ['country', SwaggerTypes.string(true)],
  ['created_at', SwaggerTypes.dateTime(true)],
  ['updated_at', SwaggerTypes.dateTime(true)],
])

export const hotelObject = SwaggerTypes.object(true, [
  ['id', SwaggerTypes.uuid(true)],
  ['name', SwaggerTypes.string(true)],
  ['city', SwaggerTypes.string(true)],
  ['state', SwaggerTypes.string(true)],
  ['country', SwaggerTypes.string(true)],
  ['created_at', SwaggerTypes.dateTime(true)],
  ['updated_at', SwaggerTypes.dateTime(true)],
])

export const hotelPaths = {
  '/hotels': {
    get: {
      tags: [hotelTag],
      summary: 'Get Hotels',
      produces: ['application/json'],
      parameters: [
        ...SwaggerQuery.params([['name', SwaggerTypes.string()]]),
        ...defaultFilterParams,
      ],
      security,
      responses: {
        ...SwaggerResponse.ok(
          'Hotels found',
          SwaggerContents.applicationJson([
            ['items', SwaggerTypes.array(true, hotelObject, 100)],
            ['totalItemsListed', SwaggerTypes.integer()],
            ['totalItems', SwaggerTypes.integer()],
          ]),
        ),
        ...defaultResponses,
      },
    },
    post: {
      tags: [hotelTag],
      summary: 'Create a new hotel',
      produces: ['application/json'],
      requestBody: {
        content: SwaggerContents.applicationJson([
          ['name', SwaggerTypes.string(true)],
          ['city', SwaggerTypes.string(true)],
          ['state', SwaggerTypes.string(true)],
          ['country', SwaggerTypes.string(true)],
        ]),
      },
      security,
      responses: {
        ...SwaggerResponse.created(
          'Hotel created',
          SwaggerContents.applicationJson(
            [
              ['id', SwaggerTypes.uuid()],
              ['name', SwaggerTypes.string()],
              ['city', SwaggerTypes.string()],
              ['state', SwaggerTypes.string()],
              ['country', SwaggerTypes.string()],
              ['created_at', SwaggerTypes.dateTime()],
              ['updated_at', SwaggerTypes.dateTime()],
            ],
            [],
            hotelObject,
          ),
        ),
        ...defaultResponses,
      },
    },
  },
  '/hotels/{id}': {
    get: {
      tags: [hotelTag],
      summary: 'Get a Hotel',
      produces: ['application/json'],
      parameters: SwaggerPath.paths([['id', SwaggerTypes.uuid(), true]]),
      security,
      responses: {
        ...SwaggerResponse.ok(
          'Hotel found',
          SwaggerContents.applicationJson([], [], hotelObject),
        ),
        ...SwaggerResponse.notFound('Hotel not found'),
        ...defaultResponses,
      },
    },
    patch: {
      tags: [hotelTag],
      summary: 'Update a Hotel by id',
      produces: ['application/json'],
      parameters: SwaggerPath.paths([['id', SwaggerTypes.uuid(), true]]),
      requestBody: {
        content: SwaggerContents.applicationJson([
          ['name', SwaggerTypes.string()],
        ]),
      },
      security,
      responses: {
        ...SwaggerResponse.ok(
          'Hotel updated',
          SwaggerContents.applicationJson(
            [
              ['id', SwaggerTypes.uuid()],
              ['name', SwaggerTypes.string()],
              ['city', SwaggerTypes.string()],
              ['state', SwaggerTypes.string()],
              ['country', SwaggerTypes.string()],
              ['created_at', SwaggerTypes.dateTime()],
              ['updated_at', SwaggerTypes.dateTime()],
            ],
            [],
            hotelObject,
          ),
        ),
        ...SwaggerResponse.notFound('Hotel not found'),
        ...defaultResponses,
      },
    },
    delete: {
      tags: [hotelTag],
      summary: 'Delete a Hotel by id',
      produces: ['application/json'],
      parameters: SwaggerPath.paths([['id', SwaggerTypes.uuid(), true]]),
      security,
      responses: {
        ...SwaggerResponse.noContent(),
        ...SwaggerResponse.notFound('Hotel not found'),
        ...defaultResponses,
      },
    },
  },
}
