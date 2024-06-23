# -------------->
FROM node:20.12.2-alpine3.18 as installer
WORKDIR /home/node
RUN sh -c "$(wget -O - https://gobinaries.com/tj/node-prune)" && npm install modclean -g
RUN wget https://gobinaries.com/tj/node-prune --output-document - | /bin/sh

USER node

COPY --chown=node:node package*.json ./
COPY --chown=node:node src/main/infra/prisma/schema.prisma ./prisma/

RUN npm ci --omit=dev --legacy-peer-deps
RUN npx prisma generate

RUN node-prune && modclean -r

# -------------->
FROM node:20.12.2-alpine3.18 as builder
USER node
WORKDIR /home/node

COPY --chown=node:node src/main/infra/prisma/schema.prisma ./prisma/
COPY --chown=node:node package*.json tsconfig.json .swcrc ./
COPY --chown=node:node src src/

RUN npm install --legacy-peer-deps
RUN npx prisma generate

RUN npm run build

# -------------->
FROM node:20.12.2-alpine3.18 as runner
ENV NODE_ENV 'production'
USER node

WORKDIR /home/node

COPY --chown=node:node --from=installer /home/node/node_modules ./node_modules
COPY --chown=node:node --from=builder /home/node/dist ./dist
COPY --chown=node:node src/main/infra/prisma/migrations ./migrations
COPY --chown=node:node src/main/infra/prisma/schema.prisma ./
COPY --chown=node:node package.json ./

CMD ["node",  "dist/src/main/infra/server.js"]