package ki.agh.dyeti.dto;

import ki.agh.dyeti.model.Meal;
import ki.agh.dyeti.model.MealProduct;
import ki.agh.dyeti.repository.ProductRepository;

public record MealProductDTO(ProductDTO product, Double quantity) {
    public static MealProductDTO fromEntity(MealProduct mealProduct) {
        return new MealProductDTO(ProductDTO.fromEntity(mealProduct.getProduct()), mealProduct.getQuantity());
    }

    public MealProduct toEntity(Meal meal, ProductRepository productRepository) {
        MealProduct mp = new MealProduct();
        mp.setMeal(meal);
        mp.setQuantity(this.quantity);
        mp.setProduct(productRepository
                .findById(product.id())
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + product.id())));
        return mp;
    }
}
