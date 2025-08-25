package ki.agh.dyeti.service.generator.util;

import ki.agh.dyeti.model.Product;
import lombok.Data;

@Data
public class NutritionPerUnit {

    private final double kcal;
    private final double protein;
    private final double carbs;
    private final double fats;

    public NutritionPerUnit(Product product) {
        double grams = product.getGramsPerUnit();
        this.kcal = grams * product.getKcal100g() / 100.0;
        this.protein = grams * product.getProtein100g() / 100.0;
        this.carbs = grams * product.getCarbs100g() / 100.0;
        this.fats = grams * product.getFat100g() / 100.0;
    }
}
