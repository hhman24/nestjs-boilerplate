##### Base stage (reusable user + OS setup) #####
FROM node:22-alpine AS base

# Create non-root user early for reuse
# RUN addgroup --system --gid 1001 node && \
#     adduser --system --uid 1001 node

WORKDIR /usr/src/app

##### Development stage #####
FROM base AS development

COPY --chown=node:node package*.json ./

# Install full (dev) dependencies
RUN npm ci

# Copy source code
COPY --chown=node:node . .

USER node

##### Build stage #####
FROM base AS build

ENV NODE_ENV=production

COPY --chown=node:node package*.json ./
COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules
COPY --chown=node:node . .

RUN npm run build

# Clean and keep only production deps
RUN npm pkg delete scripts.prepare && npm ci --only=production && npm cache clean --force

USER node

##### Production stage #####
FROM base AS production

ENV NODE_ENV=production

COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist ./dist

USER node

CMD ["node", "dist/main.js"]
