package main

import (
	"os"
	"strconv"
	sql "database/sql"

	_ "github.com/lib/pq"
	architect "github.com/architect-team/go-sdk"
	echo "github.com/labstack/echo"
	gjson "github.com/tidwall/gjson"
)

func main() {
	datastore := architect.Datastore("primary")
	dbName := datastore["name"].(string)
	user := datastore["username"].(string)
	password := datastore["password"].(string)
	db, _ := sql.Open("postgres", "user=" + user + "password=" + password + "dbname=" + dbName)
	db.Close()

	echoServer := echo.New()
	echoServer.GET("/subtract", subtract)
	echoServer.Logger.Fatal(echoServer.Start(os.Getenv("HOST") + ":" + os.Getenv("PORT")))
}

func subtract(c echo.Context) error {
	first := c.QueryParam("first")
	secondInt, _ := strconv.Atoi(c.QueryParam("second"))
	secondInt = secondInt * -1
	secondString := strconv.Itoa(secondInt)
	
	additionService := architect.Service("architect/addition-service")
	params := map[string]string{}
	params["first"] = first
	params["second"] = secondString
	response := additionService.Client().Get("/add", params)
	
	result := gjson.Get(response.String(), "result")
	resultInt, _ := strconv.Atoi(result.String())
	return c.JSON(200, map[string]int{"result": resultInt})
}
