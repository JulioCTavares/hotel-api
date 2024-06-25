import * as factory from 'factory.ts'
import { User, UserRoles } from '../../../../src/domains/user/entities'
import { faker } from '@faker-js/faker'

const userFactory = factory.Sync.makeFactory<User>({
  id: factory.each(() => faker.string.uuid()),
  name: factory.each(() => faker.internet.userName()),
  email: factory.each(() => faker.internet.email()),
  password: factory.each(() => faker.internet.password()),
  birthDate: factory.each(() => faker.date.anytime() || undefined),
  phone: factory.each(() => faker.phone.number()),
  city: factory.each(() => faker.location.city()),
  state: factory.each(() => faker.location.state()),
  country: factory.each(() => faker.location.country()),
  role: factory.each(() => faker.helpers.enumValue(UserRoles)),
  createdAt: factory.each(() => faker.date.recent()),
  updatedAt: factory.each(() => faker.date.recent()),
})

export const UserFactory = userFactory
