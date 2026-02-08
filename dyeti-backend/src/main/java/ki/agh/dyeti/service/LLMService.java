package ki.agh.dyeti.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.module.jsonSchema.JsonSchema;
import com.fasterxml.jackson.module.jsonSchema.JsonSchemaGenerator;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.*;
import java.util.stream.Collectors;
import ki.agh.dyeti.dto.MealResponseDTO;
import ki.agh.dyeti.model.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class LLMService {

    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;
    private final JsonSchemaGenerator jsonSchemaGenerator;

    @Value("${openai.api.key:}")
    private String openaiApiKey;

    private static final String OPENAI_URL = "https://api.openai.com/v1/chat/completions";
    private static final String OPENAI_MODEL = "gpt-4o-mini";
    private static final int OPENAI_MAX_TOKENS = 2000;
    private static final double DEFAULT_TEMPERATURE = 0.2;
    private static final String MEAL_RECIPE_PROMPT_FILE_PATH = "LLM_resources/prompts/MealDivisionAndRecipePrompt";

    private static final String OLLAMA_URL = "http://ollama:11434/v1/completions";
    private static final String OLLAMA_MODEL = "mistral";
    private static final String RECIPE_PROMPT_FILE_PATH = "LLM_resources/prompts/RecipePrompt";

    public LLMService(RestTemplate restTemplate, ObjectMapper objectMapper, JsonSchemaGenerator jsonSchemaGenerator) {
        this.restTemplate = restTemplate;
        this.objectMapper = objectMapper;
        this.jsonSchemaGenerator = jsonSchemaGenerator;
    }

    public String askGPT(String prompt) {
        String key = openaiApiKey != null && !openaiApiKey.isBlank() ? openaiApiKey : System.getenv("OPENAI_API_KEY");

        if (key == null || key.isBlank()) {
            throw new IllegalStateException("Missing OpenAI API key");
        }

        try {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.setBearerAuth(key);

            Map<String, Object> body = new LinkedHashMap<>();
            body.put("model", OPENAI_MODEL);
            body.put(
                    "messages",
                    List.of(
                            Map.of("role", "system", "content", "You output only valid JSON."),
                            Map.of("role", "user", "content", prompt)));
            body.put("temperature", 0.0);
            body.put("max_tokens", OPENAI_MAX_TOKENS);

            HttpEntity<Map<String, Object>> req = new HttpEntity<>(body, headers);

            Map<String, Object> res = restTemplate.postForObject(OPENAI_URL, req, Map.class);
            if (res == null) {
                return "";
            }

            List<?> choices = (List<?>) res.get("choices");
            if (choices == null || choices.isEmpty()) {
                return "";
            }

            Map<?, ?> first = (Map<?, ?>) choices.get(0);
            Map<?, ?> msg = (Map<?, ?>) first.get("message");
            if (msg == null) {
                return "";
            }

            return Objects.toString(msg.get("content"), "");

        } catch (Exception e) {
            e.printStackTrace();
            return "";
        }
    }

    public String askGPTStructured(String prompt) {
        String key = openaiApiKey != null && !openaiApiKey.isBlank() ? openaiApiKey : System.getenv("OPENAI_API_KEY");

        if (key == null || key.isBlank()) {
            throw new IllegalStateException("Missing OpenAI API key");
        }

        try {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.setBearerAuth(key);

            JsonSchema schema = jsonSchemaGenerator.generateSchema(MealResponseDTO.class);
            String schemaJson = objectMapper.writeValueAsString(schema);

            Map<String, Object> responseFormat = Map.of(
                    "type",
                    "json_schema",
                    "json_schema",
                    Map.of("name", "meal_response", "schema", objectMapper.readValue(schemaJson, Map.class)));

            Map<String, Object> body = new LinkedHashMap<>();
            body.put("model", OPENAI_MODEL);
            body.put(
                    "messages",
                    List.of(
                            Map.of("role", "system", "content", "Respond with valid JSON matching the schema."),
                            Map.of("role", "user", "content", prompt)));
            body.put("response_format", responseFormat);
            body.put("temperature", DEFAULT_TEMPERATURE);

            HttpEntity<Map<String, Object>> req = new HttpEntity<>(body, headers);

            Map<String, Object> res = restTemplate.postForObject(OPENAI_URL, req, Map.class);

            if (res == null) {
                return "";
            }

            List<?> choices = (List<?>) res.get("choices");
            if (choices == null || choices.isEmpty()) {
                return "";
            }

            Map<?, ?> first = (Map<?, ?>) choices.get(0);
            Map<?, ?> msg = (Map<?, ?>) first.get("message");

            String json = Objects.toString(msg.get("content"), "");
            System.out.println("LLM returned JSON: " + json);
            return json;

        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Structured output request to GPT failed", e);
        }
    }

    public String generateMealsAndRecipes(Plan plan, int mealCount) throws IOException {

        String basePrompt = readPromptFromResources(MEAL_RECIPE_PROMPT_FILE_PATH);

        String productListText = plan.getProducts().stream()
                .map(pp -> {
                    var p = pp.getProduct();
                    double qty = pp.getQuantity();
                    String unit = p.getUnit() != null ? p.getUnit().getName() : "g";
                    return String.format("{\"name\": \"%s\", \"amount\": \"%.0f%s\"}", p.getName(), qty, unit);
                })
                .collect(Collectors.joining(",\n  "));

        String finalPrompt =
                basePrompt.replace("MEAL_COUNT", String.valueOf(mealCount)).replace("PRODUCT_LIST", productListText);

        return askGPTStructured(finalPrompt);
    }

    public String extractJson(String text) {
        int start = text.indexOf('{');
        int end = text.lastIndexOf('}');

        if (start == -1 || end == -1 || end < start) {
            throw new IllegalStateException("LLM did not return JSON");
        }
        return text.substring(start, end + 1);
    }

    public String askOllama(String modelName, String prompt) {
        Map<String, Object> payload = Map.of(
                "model", modelName,
                "prompt", prompt,
                "stream", false);

        try {
            Map<String, Object> response = restTemplate.postForObject(OLLAMA_URL, payload, Map.class);

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

    public String recipeCreateBasedOnPlan(Plan plan) throws IOException {
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

        String response = askOllama(OLLAMA_MODEL, finalPrompt);
        if (response == null || response.isBlank()) {
            throw new IllegalStateException("Empty response from LLM while generating recipe.");
        }
        return response;
    }

    private String readPromptFromResources(String filePath) throws IOException {
        ClassPathResource resource = new ClassPathResource(filePath);
        return new String(resource.getInputStream().readAllBytes(), StandardCharsets.UTF_8);
    }
}
