package ki.agh.dyeti.service.generator;

import java.util.Map;
import ki.agh.dyeti.model.Plan;
import ki.agh.dyeti.model.Product;

public interface PlanGenerator {
    Plan generate(Plan plan, Map<Product, Double> preferences);
}
