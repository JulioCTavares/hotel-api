import { expressHttpServer } from '@/main/infra/express/express-htttp-client'
import http from 'http'

export const initAppE2E = (): http.Server => {
  return expressHttpServer
}
