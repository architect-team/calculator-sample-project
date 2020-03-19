package main

import (
	"os"
	"strconv"

	echo "github.com/labstack/echo"
	_ "github.com/lib/pq"
	gjson "github.com/tidwall/gjson"
	resty "github.com/go-resty/resty/v2"
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

	if err != nil {
		return err
	}
	params := map[string]string{}
	params["first"] = first
	params["second"] = secondString
	client := resty.New()
	client.SetHostURL("http://" + os.Getenv("ADDITION_SERVICE_ADDRESS"))
	response, err := client.R().SetQueryParams(params).Get("/add")
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
