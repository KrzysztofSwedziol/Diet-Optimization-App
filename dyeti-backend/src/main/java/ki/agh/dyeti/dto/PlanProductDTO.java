package ki.agh.dyeti.dto;

import ki.agh.dyeti.model.PlanProduct;

public record PlanProductDTO(ProductDTO product, Double quantity) {
    public static PlanProductDTO fromEntity(PlanProduct planProduct) {
        return new PlanProductDTO(ProductDTO.fromEntity(planProduct.getProduct()), planProduct.getQuantity());
    }
}
