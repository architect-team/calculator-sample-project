package architect_subtraction_service;

import java.io.InputStreamReader;
import java.net.URI;
import java.net.URISyntaxException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.util.HashMap;
import java.util.Properties;

import javax.json.Json;
import javax.json.JsonObject;
import javax.json.JsonReader;

import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.protocol.HttpClientContext;
import org.apache.http.client.utils.URIBuilder;
import org.apache.http.HttpResponse;
import org.apache.http.impl.client.HttpClientBuilder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SubtractionController {

    private URI buildFullURI(String path, HashMap<String, String> params) {
        try {
            String host = System.getenv("ADDITION_SERVICE_HOST");
            int port = Integer.parseInt(System.getenv("ADDITION_SERVICE_PORT"));

            URIBuilder uriBuilder = new URIBuilder().setScheme("http").setHost(host).setPort(port).setPath(path);
            if (params != null) {
                for (HashMap.Entry<String, String> entry : params.entrySet()) {
                    uriBuilder.addParameter(entry.getKey(), entry.getValue());
                }
            }
            return uriBuilder.build();
        } catch(URISyntaxException ex) {
            ex.printStackTrace();
            System.err.println("URI building failed");
            return null;
        }
    }

    @RequestMapping("/subtract")
    public SubtractionResult subtract(@RequestParam(value="first") String first, @RequestParam(value="second") String second) {
        Integer secondInt = Integer.parseInt(second) * -1;

        HashMap<String, String> params = new HashMap<String, String>();
        params.put("first", first);
        params.put("second", secondInt.toString());

        JsonObject responseObject = null;
        try {
            HttpClient httpClient = HttpClientBuilder.create().build();
            URI fullUri = buildFullURI("/add/", params);
            HttpClientContext httpClientContext = new HttpClientContext();
            HttpResponse response = httpClient.execute(new HttpGet(fullUri), httpClientContext);
            JsonReader reader = Json.createReader(new InputStreamReader(response.getEntity().getContent()));
            responseObject = reader.readObject();
            reader.close();
        } catch(Exception ex) {
            ex.printStackTrace();
            System.err.println("Addition get request failed");
        }

        return new SubtractionResult(responseObject.getInt("result"));
    }
}
