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
} from '@/shared/infra/swagger/helpers';

export const hotelTag = 'Hotel';

// Uncomment the next lines if you need
/*
* export const entityIncludedIntoHotelObject = SwaggerTypes.object(false, [
*   ['id', SwaggerTypes.uuid(true)],
*   ['name', SwaggerTypes.string(true)],
* ]);
*/

export const hotelSchema = SwaggerSchemas.create('Hotel', [
  ['id', SwaggerTypes.uuid(true)],
  ['name', SwaggerTypes.string(true)],
  // ['included_entity_name', SwaggerTypes.array(false, entityIncludedIntoHotelObject, 100)],
  ['created_at', SwaggerTypes.dateTime(true)],
  ['updated_at', SwaggerTypes.dateTime(true)],
]);

export const hotelObject = SwaggerTypes.object(true, [
  ['id', SwaggerTypes.uuid(true)],
  ['name', SwaggerTypes.string(true)],
  // ['included_entity_name', SwaggerTypes.array(false, entityIncludedIntoHotelObject, 100)],
  ['created_at', SwaggerTypes.dateTime(true)],
  ['updated_at', SwaggerTypes.dateTime(true)],
]);

export const hotelPaths = {
  '/hotels': {
    get: {
      tags: [hotelTag],
      summary: 'Get Hotels',
      produces: ['application/json'],
      parameters: [
        ...SwaggerQuery.params([
          ['name', SwaggerTypes.string()],
        ]),
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
        content: SwaggerContents.applicationJson(
          [
            ['name', SwaggerTypes.string(true)],
          ],
        ),
      },
      security,
      responses: {
        ...SwaggerResponse.created(
          'Hotel created',
          SwaggerContents.applicationJson([], [], hotelObject)
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
          SwaggerContents.applicationJson([], [], hotelObject)
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
        content: SwaggerContents.applicationJson(
          [
            ['name', SwaggerTypes.string()],
          ],
        ),
      },
      security,
      responses: {
        ...SwaggerResponse.ok(
          'Hotel updated',
          SwaggerContents.applicationJson([], [], hotelObject),
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
};
