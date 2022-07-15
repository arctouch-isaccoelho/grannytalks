FROM node:lts-alpine@sha256:9da65f99264be2a78682095c4789b3d8cab12e0012def7d937d7125ed6e7695c

EXPOSE 3000

WORKDIR /usr/src/app
RUN chown -R node:node /usr/src/app

COPY --chown=node:node . .

RUN yarn global add typescript

RUN yarn
RUN yarn build

USER node

CMD [ "yarn", "start" ]
