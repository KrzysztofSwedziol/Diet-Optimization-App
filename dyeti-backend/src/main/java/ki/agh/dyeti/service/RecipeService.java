package ki.agh.dyeti.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;
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
            String llmResponse = llmService.recipeCreateBasedOnPlan(plan);
            System.out.println("Response from LLM : ");
            System.out.println(llmResponse);

            if (llmResponse == null || llmResponse.isBlank()) {
                throw new IllegalStateException("Empty response from LLM while generating recipe.");
            }

            Recipe recipe = parseRecipeFromStringifiedJson(llmResponse, user);
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

    private Recipe parseRecipeFromStringifiedJson(String llmResponse, User user) {
        try {
            JsonNode node = objectMapper.readTree(llmResponse);

            String name = node.path("recipeName").asText("Generated Recipe");
            String description = node.path("description").asText("");
            String steps = "";

            if (node.has("steps")) {
                JsonNode stepsNode = node.get("steps");
                if (stepsNode.isArray()) {
                    StringBuilder sb = new StringBuilder();
                    for (JsonNode step : stepsNode) {
                        sb.append(step.asText()).append("\n");
                    }
                    steps = sb.toString().trim();
                } else {
                    steps = stepsNode.asText("");
                }
            }

            return Recipe.builder()
                    .recipeName(name)
                    .description(description)
                    .steps(steps)
                    .owner(user)
                    .build();

        } catch (Exception e) {
            e.printStackTrace();
            return Recipe.builder()
                    .recipeName("Generated Recipe")
                    .description("Recipe could not be parsed properly.")
                    .steps(llmResponse)
                    .owner(user)
                    .build();
        }
    }

    public List<RecipeDTO> getUserRecipes(Long userId) {
        return recipeRepository.findByOwnerId(userId).stream()
                .map(RecipeDTO::fromEntity)
                .collect(Collectors.toList());
    }
}
