package main

import (
	"os"
	"strconv"

	architect "github.com/architect-team/go-sdk"
	echo "github.com/labstack/echo"
	_ "github.com/lib/pq"
	gjson "github.com/tidwall/gjson"
)

func main() {
	echoServer := echo.New()
	echoServer.GET("/subtract", subtract)
	echoServer.Logger.Fatal(echoServer.Start(os.Getenv("HOST") + ":" + os.Getenv("PORT")))
}

func subtract(c echo.Context) error {
	first := c.QueryParam("first")
	secondInt, err := strconv.Atoi(c.QueryParam("second"))
	if err != nil {
		return err
	}
	secondInt = secondInt * -1
	secondString := strconv.Itoa(secondInt)

	additionService, err := architect.Service("architect/addition-service-rest")
	if err != nil {
		return err
	}
	params := map[string]string{}
	params["first"] = first
	params["second"] = secondString
	response, err := additionService.Client().R().SetQueryParams(params).Get("/add")
	if err != nil {
		return err
	}

	result := gjson.Get(response.String(), "result")
	resultInt, err := strconv.Atoi(result.String())
	if err != nil {
		return err
	}
	return c.JSON(200, map[string]int{"result": resultInt})
}
