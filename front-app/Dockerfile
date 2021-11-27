FROM node:alpine

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install --legacy-peer-deps

ENV NODE_OPTIONS=--openssl-legacy-provider

COPY ./ ./

CMD ["npm","run","start"]