package ki.agh.dyeti.service;

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
import ki.agh.dyeti.repository.RecipesProductsRepository;
import ki.agh.dyeti.security.ResourceAccessValidator;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
public class RecipeService {
    private final RecipeRepository recipeRepository;
    private final RecipesProductsRepository recipesProductsRepository;
    private final PlansRecipesRepository plansRecipesRepository;
    private final LLMService llmService;
    private final ObjectMapper objectMapper;
    private final ResourceAccessValidator resourceAccessValidator;

    public RecipeService(
            RecipeRepository recipeRepository,
            RecipesProductsRepository recipesProductsRepository,
            PlansRecipesRepository plansRecipesRepository,
            LLMService llmService,
            ObjectMapper objectMapper,
            ResourceAccessValidator resourceAccessValidator) {
        this.recipeRepository = recipeRepository;
        this.recipesProductsRepository = recipesProductsRepository;
        this.plansRecipesRepository = plansRecipesRepository;
        this.llmService = llmService;
        this.objectMapper = objectMapper;
        this.resourceAccessValidator = resourceAccessValidator;
    }

    @Transactional
    @Async
    public void generateRecipeBasedOnPlan(Plan plan, User user) {
        try {
            String llmResponse = llmService.recipeCreateAsk(plan);

            if (llmResponse == null || llmResponse.isBlank()) {
                throw new IllegalStateException("Empty response from LLM while generating recipe.");
            }
            System.out.println(llmResponse);

            Recipe recipe = parseRecipeFromJson(llmResponse, user);

            recipeRepository.save(recipe);

            plansRecipesRepository.linkPlanWithRecipe(plan.getId(), recipe.getId());

        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Failed to generate recipe based on plan.", e);
        }
    }

    private Recipe parseRecipeFromJson(String json, User creator) {
        try {
            Recipe recipe = objectMapper.readValue(json, Recipe.class);
            recipe.setCreator(creator);
            if (recipe.getRecipeName() == null || recipe.getRecipeName().isBlank()) {
                recipe.setRecipeName("Generated Recipe");
            }
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
