import { env } from '@/config'

export default {
  enabled: env.NODE_ENV !== 'test',
  level: env.NODE_ENV === 'production' ? 'info' : 'debug',
  pretty: env.NODE_ENV === 'local' || 'dev',
}
