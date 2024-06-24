import { env } from '@/config'
import cors from 'cors'

const { NODE_ENV, FRONT_URL, DEPLOY_URL } = env

const permitedUrls = NODE_ENV === 'production' ?? [FRONT_URL, DEPLOY_URL]

const options = NODE_ENV === 'dev' ? {} : { origin: permitedUrls }

export const corsMiddleware = cors(options)
