import {
  SwaggerContents,
  SwaggerPath,
  SwaggerSchemas,
  SwaggerTypes,
  SwaggerQuery,
  defaultFilterParams,
  defaultResponses,
  SwaggerResponse,
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
  ['status', SwaggerTypes.enum(true, bookingStatus)],
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
  ['status', SwaggerTypes.enum(true, bookingStatus)],
  ['created_at', SwaggerTypes.dateTime(true)],
  ['updated_at', SwaggerTypes.dateTime(true)],
])

export const bookingPaths = {
  '/bookings': {
    post: {
      tags: [bookingTag],
      summary: 'Create a new booking',
      produces: ['application/json'],
      requestBody: {
        content: SwaggerContents.applicationJson([
          ['name', SwaggerTypes.string(true)],
        ]),
      },
      responses: {
        ...SwaggerResponse.created(
          'Booking created',
          SwaggerContents.applicationJson([
            ['roomNumber', SwaggerTypes.integer(true)],
            ['bookingAmount', SwaggerTypes.integer(true)],
            ['bookingDate', SwaggerTypes.string(true)],
            ['startDate', SwaggerTypes.string(true)],
            ['endDate', SwaggerTypes.string(true)],
            ['userId', SwaggerTypes.uuid(true)],
            ['status', SwaggerTypes.enum(true, bookingStatus)],
          ]),
        ),
        ...defaultResponses,
      },
    },
  },
}
