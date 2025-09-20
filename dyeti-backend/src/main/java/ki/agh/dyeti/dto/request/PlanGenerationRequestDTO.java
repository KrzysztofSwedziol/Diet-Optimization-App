package ki.agh.dyeti.dto.request;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;

public record PlanGenerationRequestDTO(
        @NotBlank(message = "Name cannot be empty") String name,
        String description,
        @Min(800) @Max(15000) Integer calories,
        @Positive Integer carbs,
        @Positive Integer protein,
        @Positive Integer fats) {
    // TODO: further validation if macros summarizes to calories fix frontend too
}
