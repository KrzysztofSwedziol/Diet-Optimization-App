package ki.agh.dyeti.dto;

import java.util.List;

public record GeneratedMealDTO(int orderInDay, List<GeneratedProductDTO> products, List<GeneratedRecipeDTO> recipes) {}
