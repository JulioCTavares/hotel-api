import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z
    .enum(['local', 'dev', 'test', 'production'])
    .default('local')
    .optional(),
  PORT: z.coerce.number().default(3000),
  FRONT_URL: z.string().optional(),
  DEPLOY_URL: z.string().optional(),
  DATABASE_URL: z.string(),
  DATABASE_TEST_URL: z.string(),
  DATABASE_USERNAME: z.string(),
  DATABASE_PASSWORD: z.string(),
  DATABASE_PORT: z.coerce.number(),
  JWT_SECRET: z.string(),
  JWT_EXPIRATION: z.string(),
  REFRESH_TOKEN_EXPIRATION: z.string(),
  SENDGRID_API_KEY: z.string(),
  SENDGRID_EMAIl: z.string().email(),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.error('Invalid environment variables', _env.error.format())

  throw new Error('Invalid environment variables')
}

export const env = _env.data
