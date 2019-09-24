Architect Go SDK
=====================
This is the Go SDK used for brokering connections to microservice dependencies via Architect's deployment platform. If you're unfamiliar with the platform or our deploy tools, please check out Architect.io and our [CLI](https://github.com/architect-team/architect-cli) to get started.

# SDK Documentation

## Installation

The latest stable version of the Go SDK can be found here and installed with the command
```sh
go get github.com/architect-team/go-sdk
```

## Connecting to dependencies

```go
import (
    architect "github.com/architect-team/go-sdk"
)

func add() {
    additionService := architect.Service("architect/addition-service")
    params := map[string]string{}
    params["first"] = first
    params["second"] = secondString
    
    // Client used to connect to service
    response := additionService.Client().Get("/add", params)
}
```

### REST
The Architect SDK uses [Resty](https://github.com/go-resty/resty) to broker communication to downstream REST microservices. The client that is provided is an HTTP session that is enriched with the proper service location meaning only URIs and HTTP actions need be provided:

```go
response := additionService.Client().Get("/add", params)
response := additionService.Client().Post("/add", params)
response := additionService.Client().Put("/add", params)
response := additionService.Client().Delete("/add", params)
```

## Connecting to data stores
Since there are so many DB clients available, we don't want to choose a default for developers. Instead, the Architect SDK provides easy mechanics to parse credentials provided by the platform:

```go
datastore := architect.Datastore("primary")
dbName := datastore["name"].(string)
user := datastore["username"].(string)
password := datastore["password"].(string)
db, _ := sql.Open("postgres", "user=" + user + "password=" + password + "dbname=" + dbName)
db.Close()
```

## Events and messaging
The Architect platform also supports pub/sub based communication between services. The primary use-case for this flow would be to allow services to broadcast events for other services to subscribe to without needing to know who the subscribers are.

### Subscribing

```js
// architect.json
{
  "subscriptions": {
    "<service_name>": {
      "<event_name>": {
        "uri": "/event/callback",
        "headers": {
          "x-custom-header": "example"
        }
      }
    }
  }
}
```

The URI used for registration must match a URI on your service:

```go
func callbackEvent(c echo.Context) error {
    // Custom event handling here
}

echoServer := echo.New()
echoServer.GET("/event/callback", callbackEvent)
echoServer.Logger.Fatal(echoServer.Start(os.Getenv("HOST") + ":" + os.Getenv("PORT")))
```

### Publishing
_NOTE: simple publication methods coming soon. For now, you can iterate through
subscribers to submit events._

```js
// architect.json
{
  "notifications": ["<event_name>"]
}
```

```go
client := *resty.New()
for _, subscription := range architect.Notification("eventName").Subscriptions() {
    client.SetHostURL(subscription["HOST"] + ":" + subscription["port"])
	client.R().Post(subscription["uri"])
}
```
