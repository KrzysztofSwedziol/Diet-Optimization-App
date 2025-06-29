package ki.agh.dyeti.service.generator;

import ki.agh.dyeti.dto.request.PlanRequestDTO;
import ki.agh.dyeti.model.Plan;
import ki.agh.dyeti.model.Product;

import java.util.Map;

public interface PlanGenerator {
    Plan generate(Plan plan, Map<Product, Double> preferences);
}
