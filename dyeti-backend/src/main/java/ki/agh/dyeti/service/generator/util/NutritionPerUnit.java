package ki.agh.dyeti.service.generator.util;

import ki.agh.dyeti.model.Product;
import lombok.Data;

@Data
public class NutritionPerUnit {

    private static final double HUNDRED_GRAMS = 100.0;

    private final double kcal;
    private final double protein;
    private final double carbs;
    private final double fats;

    public NutritionPerUnit(Product product) {
        double grams = product.getGramsPerUnit();
        this.kcal = grams * product.getKcal100g() / HUNDRED_GRAMS;
        this.protein = grams * product.getProtein100g() / HUNDRED_GRAMS;
        this.carbs = grams * product.getCarbs100g() / HUNDRED_GRAMS;
        this.fats = grams * product.getFat100g() / HUNDRED_GRAMS;
    }
}
