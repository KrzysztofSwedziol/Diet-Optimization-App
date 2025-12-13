package ki.agh.dyeti.dto;

import java.util.List;
import java.util.stream.Collectors;
import ki.agh.dyeti.model.Meal;

public record MealDTO(Long id, Integer orderInDay, List<MealProductDTO> products, List<RecipeDTO> recipes) {
    public static MealDTO fromEntity(Meal meal) {
        return new MealDTO(
                meal.getId(),
                meal.getOrderInDay(),
                meal.getProducts().stream().map(MealProductDTO::fromEntity).collect(Collectors.toList()),
                meal.getRecipes().stream().map(RecipeDTO::fromEntity).collect(Collectors.toList()));
    }
}
