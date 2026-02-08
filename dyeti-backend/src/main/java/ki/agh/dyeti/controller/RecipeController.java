package ki.agh.dyeti.controller;

import java.util.List;
import ki.agh.dyeti.dto.RecipeDTO;
import ki.agh.dyeti.model.User;
import ki.agh.dyeti.service.RecipeService;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/recipe")
public class RecipeController {
    private final RecipeService recipeService;

    public RecipeController(RecipeService recipeService) {
        this.recipeService = recipeService;
    }

    @GetMapping()
    public List<RecipeDTO> getUserRecipes(@AuthenticationPrincipal User user) {
        return recipeService.getUserRecipes(user.getId());
    }
}
