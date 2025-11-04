package ki.agh.dyeti.service.generator;

import com.google.ortools.Loader;
import com.google.ortools.linearsolver.*;
import java.util.*;
import ki.agh.dyeti.model.Plan;
import ki.agh.dyeti.model.PlanProduct;
import ki.agh.dyeti.model.Product;
import ki.agh.dyeti.model.util.PlanProductId;
import ki.agh.dyeti.service.generator.util.NutritionPerUnit;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Component;

@Primary
@Component
public class MILPDimnishingMarginalUtility implements PlanGenerator {

    // The problem I had was that we cant use variable value in calculation of objective
    // for example we can't do : objective.setCoefficient
    // (variable, f(variable) * preference * product.getGramsPerUnit())
    // and I needed that to implement law of dimnishing values so I'm simulating it with those segments and max int,
    // now each product will have multiple variables with different coeficients according to the mentioned law
    private static final int MAX_INT_AMOUNT = 15;
    private static final int MAX_SEGMENTS_AMOUNT = 20;
    private static final double SEGMENT_SIZE = 25.0;

    private static final double CONST_K0 = 0.3;
    private static final double REF_CALORIE_DENSITY = 2.0;

    // for new variables to allow exceeding the boundaries
    private static final int MAX_MACRO_SEGMENTS = 10;
    // in percentages (how much we allow to exceed limits)
    private static final double KCAL_SEGMENT_SIZE = 0.05;
    private static final double PROTEIN_SEGMENT_SIZE = 0.1;
    private static final double FATS_SEGMENT_SIZE = 0.08;
    private static final double CARBS_SEGMENT_SIZE = 0.06;
    // exceeding boundary speed
    private static final double BASE = 1.3;

    // create list of variables for every product - needed for dimnishing marginal utility law
    public Map<Product, List<MPVariable>> createVariablesListsForProducts(
            Map<Product, Double> preferences, MPSolver solver) {
        Map<Product, List<MPVariable>> productVariables = new HashMap<>();
        for (Product product : preferences.keySet()) {
            List<MPVariable> variables = new ArrayList<>();
            if (product.getGramsPerUnit() > 1) {
                for (int i = 0; i < MAX_INT_AMOUNT; i++) {
                    MPVariable variable = solver.makeIntVar(0.0, 1.0, "x_" + product.getId() + "_" + i);
                    variables.add(variable);
                }
            } else {
                for (int i = 0; i < MAX_SEGMENTS_AMOUNT; i++) {
                    MPVariable variable = solver.makeNumVar(0.0, SEGMENT_SIZE, "x_" + product.getId() + "_" + i);
                    variables.add(variable);
                }
            }
            productVariables.put(product, variables);
        }
        return productVariables;
    }

    public void addVariablesToConstraintsAndObjective(
            MPConstraint calorieConstraint,
            MPConstraint proteinConstraint,
            MPConstraint carbohydrateConstraint,
            MPConstraint fatConstraint,
            Map<Product, List<MPVariable>> productVariables,
            Map<Product, Double> preferences,
            MPObjective objective) {
        for (Map.Entry<Product, List<MPVariable>> entry : productVariables.entrySet()) {
            Product product = entry.getKey();
            List<MPVariable> variables = entry.getValue();

            NutritionPerUnit nutritionPerUnit = new NutritionPerUnit(product);
            double gramsPerUnit = product.getGramsPerUnit();
            double calorieDensity = nutritionPerUnit.getKcal() / gramsPerUnit;

            for (int i = 0; i < variables.size(); i++) {
                MPVariable currVariable = variables.get(i);
                calorieConstraint.setCoefficient(currVariable, nutritionPerUnit.getKcal());
                proteinConstraint.setCoefficient(currVariable, nutritionPerUnit.getProtein());
                carbohydrateConstraint.setCoefficient(currVariable, nutritionPerUnit.getCarbs());
                fatConstraint.setCoefficient(currVariable, nutritionPerUnit.getFats());

                double variableCoef = this.calculateVariableCoefficient(
                        calorieDensity, preferences.getOrDefault(product, 1.0), i, product);
                objective.setCoefficient(currVariable, variableCoef);
            }
        }
    }
    //    In order to allow exceeding of limits we introduce this function. for every
    //    constraint it adds new variable but with negative coeficient. For example
    //    for fats - if we want to exceed limit, we add more and more of it
    //    because it is set tu -1 so the more we add the more we lower sum of fats
    //    but at the same time it lowers objective value exponentiali with every
    //    segment. If it is worth to exceed limit because we have one blocker. for example carbs
    //    it will exceed, but if there are more blockers - for example
    //    proteins, fats and carbs, algorithm will consider it not worthy to exceed.
    //    it fixes the problem that plan has 70% less kcal than planned because
    //    carbs limited adding more products because there's so little of them.
    public void addExceedingMacroConstraints(
            MPConstraint calorieConstraint,
            MPConstraint proteinConstraint,
            MPConstraint carbohydrateConstraint,
            MPConstraint fatConstraint,
            Plan plan,
            MPSolver solver,
            MPObjective objective) {
        List<MPConstraint> constraintList =
                List.of(calorieConstraint, proteinConstraint, carbohydrateConstraint, fatConstraint);
        List<Double> exceedingPreferences =
                List.of(KCAL_SEGMENT_SIZE, PROTEIN_SEGMENT_SIZE, CARBS_SEGMENT_SIZE, FATS_SEGMENT_SIZE);
        List<Double> planTargets = List.of(
                plan.getCaloriesTarget(), plan.getProteinsTarget(), plan.getCarbsTarget(), plan.getFatsTarget());
        for (int i = 0; i < constraintList.size(); i++) {
            MPConstraint constraint = constraintList.get(i);
            double exceedingPreference = exceedingPreferences.get(i);
            double planTarget = planTargets.get(i);
            for (int j = 0; j < MAX_MACRO_SEGMENTS; j++) {
                double currSegmentSize = exceedingPreference * planTarget;
                MPVariable variableOver = solver.makeNumVar(0.0, currSegmentSize, "x_" + i + " y_" + j + "over");
                constraint.setCoefficient(variableOver, -1);
                double variableCoef = this.calculateVariableExceedPenaltyCoeficient(j);
                objective.setCoefficient(variableOver, variableCoef);
            }
        }
    }

    public void collectResultsToPlan(Map<Product, List<MPVariable>> productVariables, Plan plan) {
        double totalCalories = 0;
        double totalProteins = 0;
        double totalCarbs = 0;
        double totalFats = 0;

        List<PlanProduct> planProducts = new ArrayList<>();

        for (Map.Entry<Product, List<MPVariable>> entry : productVariables.entrySet()) {
            Product product = entry.getKey();
            double variableCount = 0;
            for (MPVariable variable : entry.getValue()) {
                double quantity = variable.solutionValue();
                if (quantity <= 0) {
                    break;
                }
                variableCount += quantity;
            }
            if (variableCount > 0) {
                NutritionPerUnit nutritionPerUnit = new NutritionPerUnit(product);

                totalCalories += variableCount * nutritionPerUnit.getKcal();
                totalProteins += variableCount * nutritionPerUnit.getProtein();
                totalCarbs += variableCount * nutritionPerUnit.getCarbs();
                totalFats += variableCount * nutritionPerUnit.getFats();

                PlanProduct planProduct = PlanProduct.builder()
                        .id(new PlanProductId(plan.getId(), product.getId()))
                        .plan(plan)
                        .product(product)
                        .quantity(variableCount)
                        .build();

                planProducts.add(planProduct);
            }
        }

        plan.setCalories(totalCalories);
        plan.setProteins(totalProteins);
        plan.setCarbs(totalCarbs);
        plan.setFats(totalFats);
        plan.setProducts(planProducts);
    }

    public double calculateVariableCoefficient(
            double calorieDensity, double preference, int segmentIndex, Product product) {
        // function : f(x) = 1 - e^(-k*x)
        double k = CONST_K0 * (calorieDensity / REF_CALORIE_DENSITY);
        if (product.getGramsPerUnit() > 1) {
            double intervalStart = segmentIndex * product.getGramsPerUnit();
            double intervalEnd = intervalStart + product.getGramsPerUnit();

            double integralStartValue = 1 - Math.exp(-k * intervalStart);
            double integralEndValue = 1 - Math.exp(-k * intervalEnd);
            double marginalUtilityPerUnit = (integralEndValue - integralStartValue);
            return preference * marginalUtilityPerUnit;

        } else {
            double intervalStart = segmentIndex * SEGMENT_SIZE;
            double intervalEnd = intervalStart + SEGMENT_SIZE;

            double integralStartValue = 1 - Math.exp(-k * intervalStart);
            double integralEndValue = 1 - Math.exp(-k * intervalEnd);
            // creating value per one gram of a product.
            double marginalUtilityPerUnit = (integralEndValue - integralStartValue) / SEGMENT_SIZE;
            return preference * marginalUtilityPerUnit;
        }
    }

    public double calculateVariableExceedPenaltyCoeficient(int segmentNumber) {
        // determines how fast penalty grows with next exceeds
        return -(Math.pow(BASE, segmentNumber) - 1.0);
    }

    @Override
    public Plan generate(Plan plan, Map<Product, Double> preferences) {
        Loader.loadNativeLibraries();
        MPSolver solver = MPSolver.createSolver("SCIP");
        if (solver == null) {
            throw new IllegalStateException("Could not create solver.");
        }

        Map<Product, List<MPVariable>> productVariables = this.createVariablesListsForProducts(preferences, solver);

        MPConstraint calorieConstraint = solver.makeConstraint(0.0, plan.getCaloriesTarget());
        MPConstraint proteinConstraint = solver.makeConstraint(0.0, plan.getProteinsTarget());
        MPConstraint carbohydrateConstraint = solver.makeConstraint(0.0, plan.getCarbsTarget());
        MPConstraint fatConstraint = solver.makeConstraint(0.0, plan.getFatsTarget());

        MPObjective objective = solver.objective();

        this.addVariablesToConstraintsAndObjective(
                calorieConstraint,
                proteinConstraint,
                carbohydrateConstraint,
                fatConstraint,
                productVariables,
                preferences,
                objective);

        this.addExceedingMacroConstraints(
                calorieConstraint, proteinConstraint, carbohydrateConstraint, fatConstraint, plan, solver, objective);

        objective.setMaximization();

        if (solver.solve() != MPSolver.ResultStatus.OPTIMAL) {
            throw new IllegalStateException("No optimal solution found.");
        }

        this.collectResultsToPlan(productVariables, plan);

        return plan;
    }
}
