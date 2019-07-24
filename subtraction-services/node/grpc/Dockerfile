FROM node:12-alpine

WORKDIR /usr/src/app

RUN apk update && apk upgrade && \
    apk add --no-cache bash git openssh

COPY . .
RUN npm install

EXPOSE $PORT
CMD [ "npm", "start" ]
