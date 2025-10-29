package ki.agh.dyeti.dto;

import java.util.Arrays;
import java.util.List;
import ki.agh.dyeti.model.Recipe;

public record RecipeDTO(Long id, String recipeName, String description, List<String> steps) {

    public static RecipeDTO fromEntity(Recipe recipe) {
        List<String> stepsList = Arrays.stream(recipe.getSteps().split("\\n"))
                .map(String::trim)
                .filter(s -> !s.isBlank())
                .toList();

        return new RecipeDTO(recipe.getId(), recipe.getRecipeName(), recipe.getDescription(), stepsList);
    }
}
