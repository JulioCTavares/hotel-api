import { env } from '@/config'

const protocolMap = ['http', 'https']
const urlMap = [`localhost:${env.PORT}`, env.STAGE_DEPLOY_URL]

const protocol = env.NODE_ENV === 'local' ? protocolMap[0] : protocolMap[1]

const url = env.NODE_ENV === 'local' ? urlMap[0] : urlMap[1]

export const servers = [
  {
    url: '{protocol}://{url}',
    variables: {
      url: {
        enum: urlMap,
        default: url,
      },
      protocol: {
        enum: protocolMap,
        default: protocol,
      },
    },
  },
]
