package ki.agh.dyeti.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;
import ki.agh.dyeti.dto.RecipeDTO;
import ki.agh.dyeti.model.Plan;
import ki.agh.dyeti.model.Recipe;
import ki.agh.dyeti.model.User;
import ki.agh.dyeti.repository.PlansRecipesRepository;
import ki.agh.dyeti.repository.RecipeRepository;
import org.springframework.stereotype.Service;

@Service
public class RecipeService {
    private final RecipeRepository recipeRepository;
    private final PlansRecipesRepository plansRecipesRepository;
    private final LLMService llmService;
    private final ObjectMapper objectMapper;

    public RecipeService(
            RecipeRepository recipeRepository,
            PlansRecipesRepository plansRecipesRepository,
            LLMService llmService,
            ObjectMapper objectMapper) {
        this.recipeRepository = recipeRepository;
        this.plansRecipesRepository = plansRecipesRepository;
        this.llmService = llmService;
        this.objectMapper = objectMapper;
    }

    @Transactional
    public void generateRecipeBasedOnPlan(Plan plan, User user) {
        try {
            String llmResponse = llmService.recipeCreateAsk(plan);

            if (llmResponse == null || llmResponse.isBlank()) {
                throw new IllegalStateException("Empty response from LLM while generating recipe.");
            }

            Recipe recipe = parseRecipeFromJson(llmResponse, user);
            System.out.println("Recipe parsed successfully from json string to Recipe class");

            recipeRepository.save(recipe);
            System.out.println("Recipe saved with id: " + recipe.getId());

            plansRecipesRepository.linkPlanWithRecipe(plan.getId(), recipe.getId());
            System.out.println("Linked recipe with plan successfully.");

        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Failed to generate recipe based on plan.", e);
        }
    }

    private Recipe parseRecipeFromJson(String json, User creator) {
        try {
            json = json.trim();

            if (json.startsWith("\"") && json.endsWith("\"")) {
                json = json.substring(1, json.length() - 1)
                        .replace("\\n", "\n")
                        .replace("\\\"", "\"")
                        .replace("\\\\", "\\");
            }

            JsonNode node = objectMapper.readTree(json);

            String recipeName = node.path("recipeName").asText("Generated Recipe");
            String description = node.path("description").asText("");
            String steps;

            JsonNode stepsNode = node.path("steps");
            if (stepsNode.isArray()) {
                steps = StreamSupport.stream(stepsNode.spliterator(), false)
                        .map(JsonNode::asText)
                        .collect(Collectors.joining("\n"));
            } else {
                steps = stepsNode.asText("");
            }

            Recipe recipe = Recipe.builder()
                    .recipeName(recipeName)
                    .description(description)
                    .steps(steps)
                    .creator(creator)
                    .build();

            return recipe;

        } catch (Exception e) {
            return Recipe.builder()
                    .recipeName("Generated Recipe")
                    .description("Recipe could not be parsed properly.")
                    .steps(json)
                    .creator(creator)
                    .build();
        }
    }

    public List<RecipeDTO> getUserRecipes(Long userId) {
        return recipeRepository.findAllByCreatorId(userId).stream()
                .map(RecipeDTO::fromEntity)
                .collect(Collectors.toList());
    }
}
