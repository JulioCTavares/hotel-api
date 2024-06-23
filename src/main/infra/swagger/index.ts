import {
  bookingPaths,
  bookingSchema,
  bookingTag,
} from '@/domains/booking/infra/swagger'
import { userPaths, userTag, userSchema } from '@/domains/user/infra/swagger'
import { errorSchema, servers } from '@/shared/infra/swagger/helpers'

const tags = [userTag, bookingTag]

const schemas = {
  ...errorSchema,
  ...userSchema,
  ...bookingSchema,
}

export default {
  openapi: '3.0.0',
  info: {
    title: 'Hotel API',
    version: '1.0.0',
    description: 'API',
    contact: {
      email: 'suporte@hotels.com',
    },
  },
  servers,
  tags,
  paths: {
    ...userPaths,
    ...bookingPaths,
  },
  components: {
    schemas,
  },
}
