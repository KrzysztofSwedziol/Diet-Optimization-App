package ki.agh.dyeti.dto.request;

public record ProductRequestDTO(
        String name,
        Long unitId,
        Double gramsPerUnit,
        Double kcal100g,
        Double protein100g,
        Double carbs100g,
        Double fat100g) {}
