import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['local', 'dev', 'test', 'production']).default('dev'),
  PORT: z.coerce.number().default(3000),
  FRONT_PROD_URL: z.string(),
  FRONT_STAGE_URL: z.string(),
  STAGE_DEPLOY_URL: z.string(),
  PROD_DEPLOY_URL: z.string(),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.error('Invalid environment variables', _env.error.format())

  throw new Error('Invalid environment variables')
}

export const env = _env.data
