package ki.agh.dyeti.dto;

import ki.agh.dyeti.model.Product;

public record ProductDTO(
        Long id,
        String name,
        UnitDTO unit,
        Double gramsPerUnit,
        Double kcal100g,
        Double protein100g,
        Double carbs100g,
        Double fat100g,
        Long ownerId) {
    public static ProductDTO fromEntity(Product product) {
        Long ownerId = product.getOwner() != null ? product.getOwner().getId() : null;

        return new ProductDTO(
                product.getId(),
                product.getName(),
                UnitDTO.fromEntity(product.getUnit()),
                product.getGramsPerUnit(),
                product.getKcal100g(),
                product.getProtein100g(),
                product.getCarbs100g(),
                product.getFat100g(),
                ownerId);
    }
}
