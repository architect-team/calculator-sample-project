FROM node:12-alpine

WORKDIR /usr/src/app

RUN apk update && apk upgrade && \
    apk add --no-cache bash git openssh

COPY . .
RUN npm install && npm rebuild

EXPOSE 8080
CMD [ "npm", "start" ]
