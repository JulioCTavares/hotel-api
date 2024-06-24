import {
  SwaggerContents,
  SwaggerPath,
  SwaggerSchemas,
  SwaggerTypes,
  SwaggerQuery,
  defaultFilterParams,
  defaultResponses,
  SwaggerResponse,
  security,
} from '@/shared/infra/swagger/helpers'
import { BookingStatus } from '../../entities'

export const bookingTag = 'Booking'

const bookingStatus = Object.values(BookingStatus)

export const bookingSchema = SwaggerSchemas.create('Booking', [
  ['id', SwaggerTypes.uuid(true)],
  ['roomNumber', SwaggerTypes.integer(true)],
  ['bookingAmount', SwaggerTypes.integer(true)],
  ['bookingDate', SwaggerTypes.string(true)],
  ['startDate', SwaggerTypes.string(true)],
  ['endDate', SwaggerTypes.string(true)],
  ['userId', SwaggerTypes.uuid(true)],
  ['hotelId', SwaggerTypes.uuid(true)],
  ['status', SwaggerTypes.enum(bookingStatus, true)],
  ['created_at', SwaggerTypes.dateTime(true)],
  ['updated_at', SwaggerTypes.dateTime(true)],
])

export const bookingObject = SwaggerTypes.object(true, [
  ['id', SwaggerTypes.uuid(true)],
  ['roomNumber', SwaggerTypes.integer(true)],
  ['bookingAmount', SwaggerTypes.integer(true)],
  ['bookingDate', SwaggerTypes.string(true)],
  ['startDate', SwaggerTypes.string(true)],
  ['endDate', SwaggerTypes.string(true)],
  ['userId', SwaggerTypes.uuid(true)],
  ['hotelId', SwaggerTypes.uuid(true)],
  ['status', SwaggerTypes.enum(bookingStatus, true)],
  ['created_at', SwaggerTypes.dateTime(true)],
  ['updated_at', SwaggerTypes.dateTime(true)],
])

export const bookingPaths = {
  '/bookings': {
    get: {
      tags: [bookingTag],
      summary: 'Get Bookings',
      produces: ['application/json'],
      parameters: [
        ...SwaggerQuery.params([
          ['roomNumber', SwaggerTypes.integer()],
          ['bookingAmount', SwaggerTypes.integer()],
          ['bookingDate', SwaggerTypes.string()],
          ['startDate', SwaggerTypes.string()],
          ['endDate', SwaggerTypes.string()],
          ['userId', SwaggerTypes.uuid()],
          ['hotelId', SwaggerTypes.uuid()],
          ['status', SwaggerTypes.enum(bookingStatus)],
        ]),
        ...defaultFilterParams,
      ],
      security,
      responses: {
        ...SwaggerResponse.ok(
          'Bookings found',
          SwaggerContents.applicationJson([
            ['items', SwaggerTypes.array(true, bookingObject, 100)],
            ['totalItemsListed', SwaggerTypes.integer()],
            ['totalItems', SwaggerTypes.integer()],
          ]),
        ),
        ...defaultResponses,
      },
    },
    post: {
      tags: [bookingTag],
      summary: 'Create a new booking',
      produces: ['application/json'],
      requestBody: {
        content: SwaggerContents.applicationJson([
          ['roomNumber', SwaggerTypes.integer(true)],
          ['bookingAmount', SwaggerTypes.integer(true)],
          ['bookingDate', SwaggerTypes.string(true)],
          ['startDate', SwaggerTypes.string(true)],
          ['endDate', SwaggerTypes.string(true)],
          ['userId', SwaggerTypes.uuid(true)],
          ['hotelId', SwaggerTypes.uuid(true)],
          ['status', SwaggerTypes.enum(bookingStatus, true)],
        ]),
      },
      security,
      responses: {
        ...SwaggerResponse.created(
          'Booking created',
          SwaggerContents.applicationJson([]),
        ),
        ...defaultResponses,
      },
    },
  },
  '/bookings/{id}': {
    get: {
      tags: [bookingTag],
      summary: 'Get a Booking',
      produces: ['application/json'],
      parameters: SwaggerPath.paths([['id', SwaggerTypes.uuid(), true]]),
      security,
      responses: {
        ...SwaggerResponse.ok(
          'Booking found',
          SwaggerContents.applicationJson([], [], bookingObject),
        ),
        ...SwaggerResponse.notFound('Booking not found'),
        ...defaultResponses,
      },
    },
    patch: {
      tags: [bookingTag],
      summary: 'Update a Booking by id',
      produces: ['application/json'],
      parameters: SwaggerPath.paths([['id', SwaggerTypes.uuid(), true]]),
      requestBody: {
        content: SwaggerContents.applicationJson([
          ['roomNumber', SwaggerTypes.integer()],
          ['bookingAmount', SwaggerTypes.integer()],
          ['bookingDate', SwaggerTypes.string()],
          ['startDate', SwaggerTypes.string()],
          ['endDate', SwaggerTypes.string()],
          ['userId', SwaggerTypes.uuid()],
          ['hotelId', SwaggerTypes.uuid()],
          ['status', SwaggerTypes.enum(bookingStatus)],
        ]),
      },
      security,
      responses: {
        ...SwaggerResponse.ok(
          'Booking updated',
          SwaggerContents.applicationJson([], [], bookingObject),
        ),
        ...SwaggerResponse.notFound('Booking not found'),
        ...defaultResponses,
      },
    },
    delete: {
      tags: [bookingTag],
      summary: 'Delete a Booking by id',
      produces: ['application/json'],
      parameters: SwaggerPath.paths([['id', SwaggerTypes.uuid(), true]]),
      security,
      responses: {
        ...SwaggerResponse.noContent(),
        ...SwaggerResponse.notFound('Booking not found'),
        ...defaultResponses,
      },
    },
  },
}
