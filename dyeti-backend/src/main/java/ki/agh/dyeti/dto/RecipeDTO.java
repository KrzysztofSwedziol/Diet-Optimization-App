package ki.agh.dyeti.dto;

import java.util.Arrays;
import java.util.List;
import java.util.stream.IntStream;
import ki.agh.dyeti.model.Recipe;

public record RecipeDTO(Long id, String recipeName, String description, List<String> steps) {

    public static RecipeDTO fromEntity(Recipe recipe) {
        List<String> stepsList = Arrays.stream(recipe.getSteps().split("\\n"))
                .map(String::trim)
                .filter(s -> !s.isBlank())
                .toList();

        List<String> numberedSteps = IntStream.range(0, stepsList.size())
                .mapToObj(i -> (i + 1) + ". " + stepsList.get(i))
                .toList();

        return new RecipeDTO(recipe.getId(), recipe.getRecipeName(), recipe.getDescription(), numberedSteps);
    }
}
