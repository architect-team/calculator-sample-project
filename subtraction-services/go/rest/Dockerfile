FROM golang:alpine

RUN apk update && apk add --no-cache git
WORKDIR $GOPATH/src/
COPY . .

RUN go mod vendor

CMD ["go", "run", "main.go"]
