FROM node:20-alpine
WORKDIR /dist
COPY package.json postcss.config.js jsconfig.json middleware.js next.config.mjs tailwind.config.js ./
COPY db.json.template ./db.json

COPY app ./app
COPY public ./public

RUN yarn
RUN yarn build

CMD ["yarn", "start"]
