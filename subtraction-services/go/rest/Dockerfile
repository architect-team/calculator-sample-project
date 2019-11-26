FROM golang:alpine

RUN apk update && apk add --no-cache git
WORKDIR $GOPATH/src/
COPY . .

RUN GO111MODULE=on go mod vendor

CMD ["go", "run", "main.go"]
