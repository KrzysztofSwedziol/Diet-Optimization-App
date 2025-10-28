package ki.agh.dyeti.dto;

import ki.agh.dyeti.model.Recipe;

public record RecipeDTO(Long id, String recipeName, String description, String steps) {

    public static RecipeDTO fromEntity(Recipe recipe) {
        return new RecipeDTO(recipe.getId(), recipe.getRecipeName(), recipe.getDescription(), recipe.getSteps());
    }
}
