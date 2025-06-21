package ki.agh.dyeti.dto;

import ki.agh.dyeti.model.Unit;

public record UnitDTO(
    Long id,
    String name,
    String symbol
) {
    public static UnitDTO fromEntity(Unit unit) {
        return new UnitDTO(
            unit.getId(),
            unit.getName(),
            unit.getSymbol()
        );
    }
}
