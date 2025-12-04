package ki.agh.dyeti.service;

import com.fasterxml.jackson.databind.ObjectMapper;
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
    private final ObjectMapper objectMapper;
    private static final String URL = "http://ollama:11434/v1/completions";
    private static final String MODEL_NAME = "mistral";
    private static final String RECIPE_PROMPT_FILE_PATH = "LLM_resources/prompts/RecipePrompt";
    private static final String MEAL_RECIPE_PROMPT_FILE_PATH = "LLM_resources/prompts/MealDivisionAndRecipePrompt";

    public LLMService(RestTemplate restTemplate, ObjectMapper objectMapper) {
        this.restTemplate = restTemplate;
        this.objectMapper = objectMapper;
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
        String basePrompt = readPromptFromResources(RECIPE_PROMPT_FILE_PATH);

        String planText = plan.getProducts().stream()
                .map(pp -> {
                    Product product = pp.getProduct();
                    double gramsPerUnit = product.getGramsPerUnit();
                    double quantity = pp.getQuantity();
                    String unit = product.getUnit() != null ? product.getUnit().getName() : "g";

                    String amount;
                    if (gramsPerUnit <= 1) {
                        amount = String.format("%.0f%s", quantity, unit);
                    } else {
                        amount = String.format("%.0f (grams per unit: %.0fg)", quantity, gramsPerUnit);
                    }

                    Map<String, String> obj = Map.of("name", product.getName(), "amount", amount);
                    try {
                        return objectMapper.writeValueAsString(obj);
                    } catch (Exception e) {
                        return "{\"name\":\"" + product.getName() + "\",\"amount\":\"" + amount + "\"}";
                    }
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

    //    public String generateMealsAndRecipes(Plan plan, int mealQuantity) throws IOException {
    //        String basePrompt = readPromptFromResources(MEAL_RECIPE_PROMPT_FILE_PATH);
    //
    //        String productList = plan.getProducts().stream()
    //                .map(pp -> {
    //                    var p = pp.getProduct();
    //                    String unit = p.getUnit() != null ? p.getUnit().getName() : "g";
    //                    return "- " + p.getName() + ": " + pp.getQuantity() + unit;
    //                })
    //                .collect(Collectors.joining("\n"));
    //
    //        String finalPrompt =
    //                basePrompt.replace("MEAL_COUNT", String.valueOf(mealQuantity)).replace("PRODUCT_LIST",
    // productList);
    //
    //        System.out.println("Prompt for meals:");
    //        System.out.println(finalPrompt);
    //
    //        String response = ask("mistral", finalPrompt);
    //
    //        if (response == null || response.isBlank()) {
    //            throw new IllegalStateException("Empty response from LLM");
    //        }
    //
    //        return response;
    //    }

    private String readPromptFromResources(String filePath) throws IOException {
        ClassPathResource resource = new ClassPathResource(filePath);
        return new String(resource.getInputStream().readAllBytes(), StandardCharsets.UTF_8);
    }
}
