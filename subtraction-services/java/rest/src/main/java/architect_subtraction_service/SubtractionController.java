package architect_subtraction_service;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.HashMap;

import org.apache.http.HttpResponse;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import architect_sdk.Architect;
import architect_sdk.ArchitectService;

@RestController
public class SubtractionController {

    @RequestMapping("/subtract")
    public SubtractionResult subtract(@RequestParam(value="first") String first, @RequestParam(value="second") String second) {
        Integer secondInt = Integer.parseInt(second) * -1;

        ArchitectService additionService = Architect.sdk().service("addition_service");
        HashMap<String, String> params = new HashMap<String, String>();
        params.put("first", first);
        params.put("second", secondInt.toString());
        
        StringBuilder stringBuilder = new StringBuilder();
        try {
            HttpResponse response = additionService.client().get("/add", params);
            BufferedReader reader = new BufferedReader(new InputStreamReader(response.getEntity().getContent()), 65728);
            String line = null;

            while ((line = reader.readLine()) != null) {
                stringBuilder.append(line);
            }
        } catch(Exception ex) {
            ex.printStackTrace();
            System.err.println("Addition get request failed");
        }

        return new SubtractionResult(Integer.parseInt(stringBuilder.toString()));
    }
}