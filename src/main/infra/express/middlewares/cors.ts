import { env } from '@/config'
import cors from 'cors'

const {
  NODE_ENV,
  FRONT_PROD_URL,
  FRONT_STAGE_URL,
  PROD_DEPLOY_URL,
  STAGE_DEPLOY_URL,
} = env

const permitedUrls =
  NODE_ENV === 'production'
    ? [PROD_DEPLOY_URL, FRONT_PROD_URL]
    : [STAGE_DEPLOY_URL, FRONT_STAGE_URL]

const options = NODE_ENV === 'dev' ? {} : { origin: permitedUrls }

export const corsMiddleware = cors(options)
