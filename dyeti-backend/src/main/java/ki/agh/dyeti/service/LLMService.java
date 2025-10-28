package ki.agh.dyeti.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Map;
import java.util.stream.Collectors;
import ki.agh.dyeti.model.Plan;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class LLMService {

    private final RestTemplate restTemplate;
    private static final String URL = "http://localhost:11434/v1/completions";
    private static final String MODEL_NAME = "mistral";
    private static final String RECIPE_PROMPT_FILE_PATH = "../../miscellaneous/LLM_resources/prompts/RecipePrompt";

    public LLMService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public String ask(String modelName, String prompt) {
        Map<String, String> payload = Map.of(
                "model", modelName,
                "prompt", prompt);

        try {
            Map<String, Object> response = restTemplate.postForObject(URL, payload, Map.class);
            if (response != null && response.containsKey("completion")) {
                return response.get("completion").toString();
            } else {
                return "";
            }
        } catch (Exception e) {
            e.printStackTrace();
            return "";
        }
    }

    public String recipeCreateAsk(Plan plan) throws IOException {
        String basePrompt = Files.readString(Path.of(RECIPE_PROMPT_FILE_PATH));

        String planText = plan.getProducts().stream()
                .map(pp -> pp.getProduct().getName() + ": " + pp.getQuantity() + " "
                        + pp.getProduct().getUnit().getName())
                .collect(Collectors.joining("\n"));

        String finalPrompt = basePrompt + "\n\nProducts to use in recipe:\n" + planText;

        return ask(MODEL_NAME, finalPrompt);
    }
}
