package ki.agh.dyeti.dto;

import ki.agh.dyeti.model.Plan;

import java.util.List;
import java.util.stream.Collectors;

public record PlanDTO(
        Long id,
        String name,
        String description,
        Double caloriesTarget,
        Double proteinsTarget,
        Double carbsTarget,
        Double fatsTarget,
        Double calories,
        Double proteins,
        Double carbs,
        Double fats,
        List<PlanProductDTO> products) {
    public static PlanDTO fromEntity(Plan plan) {
        return new PlanDTO(
            plan.getId(),
            plan.getName(),
            plan.getDescription(),
            plan.getCaloriesTarget(),
            plan.getProteinsTarget(),
            plan.getCarbsTarget(),
            plan.getFatsTarget(),
            plan.getCalories(),
            plan.getProteins(),
            plan.getCarbs(),
            plan.getFats(),
            plan.getProducts().stream().map(PlanProductDTO::fromEntity).collect(Collectors.toList())
        );
    }
}
