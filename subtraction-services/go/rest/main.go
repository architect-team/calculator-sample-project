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
    datastore, err := architect.Datastore("primary")
    if err != nil {
        panic(err)
    }
    dbName := datastore["name"].(string)
    user := datastore["username"].(string)
    password := datastore["password"].(string)
    db, err := sql.Open("postgres", "user=" + user + "password=" + password + "dbname=" + dbName)
    if err != nil {
        panic(err)
    }
    db.Close()

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

    additionService, err := architect.Service("architect/addition-service")
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
