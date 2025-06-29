package ki.agh.dyeti.service.generator;

import com.google.ortools.Loader;
import com.google.ortools.linearsolver.*;
import java.util.*;
import ki.agh.dyeti.model.Plan;
import ki.agh.dyeti.model.PlanProduct;
import ki.agh.dyeti.model.Product;
import ki.agh.dyeti.model.util.PlanProductId;
import ki.agh.dyeti.service.generator.util.NutritionPerUnit;
import org.springframework.stereotype.Component;

@Component
public class MILPPlanGenerator implements PlanGenerator {

    @Override
    public Plan generate(Plan plan, Map<Product, Double> preferences) {
        Loader.loadNativeLibraries();
        MPSolver solver = MPSolver.createSolver("SCIP");
        if (solver == null) {
            throw new IllegalStateException("Could not create solver.");
        }

        double infinity = Double.POSITIVE_INFINITY;

        Map<Product, MPVariable> productVariables = new HashMap<>();
        for (Product product : preferences.keySet()) {
            MPVariable variable = "piece".equals(product.getUnit().getName())
                    ? solver.makeIntVar(0.0, infinity, "x_" + product.getId())
                    : solver.makeNumVar(0.0, infinity, "x_" + product.getId());
            productVariables.put(product, variable);
        }

        MPConstraint calorieConstraint = solver.makeConstraint(0.0, plan.getCaloriesTarget());
        MPConstraint proteinConstraint = solver.makeConstraint(0.0, plan.getProteinsTarget());
        MPConstraint carbohydrateConstraint = solver.makeConstraint(0.0, plan.getCarbsTarget());
        MPConstraint fatConstraint = solver.makeConstraint(0.0, plan.getFatsTarget());

        MPObjective objective = solver.objective();

        for (Map.Entry<Product, MPVariable> entry : productVariables.entrySet()) {
            Product product = entry.getKey();
            MPVariable variable = entry.getValue();

            NutritionPerUnit nutritionPerUnit = new NutritionPerUnit(product);

            calorieConstraint.setCoefficient(variable, nutritionPerUnit.getKcal());
            proteinConstraint.setCoefficient(variable, nutritionPerUnit.getProtein());
            carbohydrateConstraint.setCoefficient(variable, nutritionPerUnit.getCarbs());
            fatConstraint.setCoefficient(variable, nutritionPerUnit.getFats());

            double preference = preferences.getOrDefault(product, 1.0);
            objective.setCoefficient(variable, preference * product.getGramsPerUnit());
        }

        objective.setMaximization();

        if (solver.solve() != MPSolver.ResultStatus.OPTIMAL) {
            throw new IllegalStateException("No optimal solution found.");
        }

        double totalCalories = 0;
        double totalProteins = 0;
        double totalCarbs = 0;
        double totalFats = 0;

        List<PlanProduct> planProducts = new ArrayList<>();

        for (Map.Entry<Product, MPVariable> entry : productVariables.entrySet()) {
            double quantity = entry.getValue().solutionValue();
            if (quantity > 0) {
                Product product = entry.getKey();
                NutritionPerUnit nutritionPerUnit = new NutritionPerUnit(product);

                totalCalories += quantity * nutritionPerUnit.getKcal();
                totalProteins += quantity * nutritionPerUnit.getProtein();
                totalCarbs += quantity * nutritionPerUnit.getCarbs();
                totalFats += quantity * nutritionPerUnit.getFats();

                PlanProduct planProduct = PlanProduct.builder()
                        .id(new PlanProductId(plan.getId(), product.getId()))
                        .plan(plan)
                        .product(product)
                        .quantity(quantity)
                        .build();

                planProducts.add(planProduct);
            }
        }

        plan.setCalories(totalCalories);
        plan.setProteins(totalProteins);
        plan.setCarbs(totalCarbs);
        plan.setFats(totalFats);
        plan.setProducts(planProducts);

        return plan;
    }
}
