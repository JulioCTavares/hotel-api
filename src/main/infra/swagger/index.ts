import {
  authPaths,
  authTag,
  authUserSchema,
} from '@/domains/auth/infra/swagger'
import {
  bookingPaths,
  bookingSchema,
  bookingTag,
} from '@/domains/booking/infra/swagger'
import { userPaths, userTag, userSchema } from '@/domains/user/infra/swagger'
import { errorSchema, servers } from '@/shared/infra/swagger/helpers'

const tags = [userTag, bookingTag, authTag]

const schemas = {
  ...errorSchema,
  ...userSchema,
  ...bookingSchema,
  ...authUserSchema,
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
    ...authPaths,
  },
  components: {
    schemas,
  },
}
