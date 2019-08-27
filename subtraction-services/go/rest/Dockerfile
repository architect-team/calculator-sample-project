FROM golang:alpine

RUN apk update && apk add --no-cache git
WORKDIR $GOPATH/src/
COPY . .

RUN go get -d -v

CMD ["go", "run", "main.go"]
