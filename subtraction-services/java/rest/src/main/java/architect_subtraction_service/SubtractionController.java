package architect_subtraction_service;

import java.io.InputStreamReader;
import java.sql.Connection;
import java.sql.DriverManager;
import java.util.HashMap;
import java.util.Properties;

import javax.json.Json;
import javax.json.JsonObject;
import javax.json.JsonReader;

import org.apache.http.HttpResponse;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.architect.Architect;
import io.architect.ArchitectService;

@RestController
public class SubtractionController {

    @RequestMapping("/subtract")
    public SubtractionResult subtract(@RequestParam(value="first") String first, @RequestParam(value="second") String second) {
        Integer secondInt = Integer.parseInt(second) * -1;

        ArchitectService additionService = Architect.service("architect/addition-service");
        HashMap<String, String> params = new HashMap<String, String>();
        params.put("first", first);
        params.put("second", secondInt.toString());

        JsonObject responseObject = null;
        try {
            HttpResponse response = additionService.client().get("/add/", params);
            JsonReader reader = Json.createReader(new InputStreamReader(response.getEntity().getContent()));
            responseObject = reader.readObject();
            reader.close();
        } catch(Exception ex) {
            ex.printStackTrace();
            System.err.println("Addition get request failed");
        }

        JsonObject datastoreConfig = Architect.datastore("primary");
        Connection conn = null;
        String dbHost = datastoreConfig.getString("host");
        Integer dbPort = datastoreConfig.getInt("port");

        Properties connectionProps = new Properties();
        connectionProps.put("user", datastoreConfig.getString("username"));
        connectionProps.put("password", datastoreConfig.getString("password"));

        try {
            conn = DriverManager.getConnection(
                    "jdbc:postgresql://" +
                    dbHost + ":" + dbPort.toString() +
                    "/" + datastoreConfig.getString("name"),
                    connectionProps);
            conn.close();
        } catch(Exception ex) {
            ex.printStackTrace();
        }

        return new SubtractionResult(responseObject.getInt("result"));
    }
}
