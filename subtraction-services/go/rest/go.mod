module github.com/architect-team/calculator-example

go 1.13

require (
	github.com/architect-team/go-sdk v0.1.0
	github.com/labstack/echo v3.3.10+incompatible
	github.com/labstack/gommon v0.3.0 // indirect
	github.com/lib/pq v1.2.0
	github.com/tidwall/gjson v1.3.2
)

replace github.com/architect-team/go-sdk => ./go-sdk
