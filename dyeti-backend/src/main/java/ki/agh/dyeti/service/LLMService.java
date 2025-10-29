package ki.agh.dyeti.service;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import ki.agh.dyeti.model.Plan;
import ki.agh.dyeti.model.Product;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class LLMService {

    private final RestTemplate restTemplate;
    private static final String URL = "http://ollama:11434/v1/completions";
    private static final String MODEL_NAME = "mistral";
    private static final String RECIPE_PROMPT_FILE_PATH = "LLM_resources/prompts/RecipePrompt";

    public LLMService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public String ask(String modelName, String prompt) {
        Map<String, Object> payload = Map.of(
                "model", modelName,
                "prompt", prompt,
                "stream", false);

        try {
            Map<String, Object> response = restTemplate.postForObject(URL, payload, Map.class);

            if (response != null && response.containsKey("choices")) {
                var choices = (List<Map<String, Object>>) response.get("choices");
                if (!choices.isEmpty() && choices.get(0).get("text") != null) {
                    return choices.get(0).get("text").toString();
                }
            }
            return "";
        } catch (Exception e) {
            e.printStackTrace();
            return "";
        }
    }

    public String recipeCreateAsk(Plan plan) throws IOException {
        String basePrompt = readPromptFromResources();

        String planText = plan.getProducts().stream()
                .map(pp -> {
                    Product product = pp.getProduct();
                    double gramsPerUnit = product.getGramsPerUnit();
                    double quantity = pp.getQuantity();
                    String unit = product.getUnit() != null ? product.getUnit().getName() : "g"; // fallback

                    String amount;
                    if (gramsPerUnit <= 1) {
                        amount = String.format("%.0f%s", quantity, unit);
                    } else {
                        amount = String.format("%.0f (grams per unit: %.0fg)", quantity, gramsPerUnit);
                    }

                    return String.format(
                            "{\"name\": \"%s\", \"amount\": \"%s\"}",
                            escapeJson(product.getName()), escapeJson(amount));
                })
                .collect(Collectors.joining(",\n  "));

        String finalPrompt = basePrompt + "\n\nProducts to use in recipe:\n" + planText;
        System.out.println("Final prompt : ");
        System.out.println(finalPrompt);

        String response = ask(MODEL_NAME, finalPrompt);
        if (response == null || response.isBlank()) {
            throw new IllegalStateException("Empty response from LLM while generating recipe.");
        }
        return response;
    }

    private String readPromptFromResources() throws IOException {
        ClassPathResource resource = new ClassPathResource(RECIPE_PROMPT_FILE_PATH);
        return new String(resource.getInputStream().readAllBytes(), StandardCharsets.UTF_8);
    }

    private String escapeJson(String text) {
        if (text == null) return "";
        return text.replace("\\", "\\\\")
                .replace("\"", "\\\"")
                .replace("\n", "\\n")
                .replace("\r", "\\r");
    }
}
