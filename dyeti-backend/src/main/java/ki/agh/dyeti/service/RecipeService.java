package ki.agh.dyeti.service;

import ki.agh.dyeti.repository.PlansRecipesRepository;
import ki.agh.dyeti.repository.RecipeRepository;
import ki.agh.dyeti.repository.RecipesProductsRepository;
import org.springframework.stereotype.Service;

@Service
public class RecipeService {
    private final RecipeRepository recipeRepository;
    private final RecipesProductsRepository recipesProductsRepository;
    private final PlansRecipesRepository plansRecipesRepository;

    public RecipeService(
            RecipeRepository recipeRepository,
            RecipesProductsRepository recipesProductsRepository,
            PlansRecipesRepository plansRecipesRepository) {
        this.recipeRepository = recipeRepository;
        this.recipesProductsRepository = recipesProductsRepository;
        this.plansRecipesRepository = plansRecipesRepository;
    }
}
