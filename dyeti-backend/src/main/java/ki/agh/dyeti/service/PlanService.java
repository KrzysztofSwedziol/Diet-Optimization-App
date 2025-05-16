package ki.agh.dyeti.service;

import ki.agh.dyeti.repository.PlanRepository;
import ki.agh.dyeti.repository.PlansProductsRepository;
import ki.agh.dyeti.repository.PlansRecipesRepository;
import org.springframework.stereotype.Service;

@Service
public class PlanService {
    private final PlanRepository planRepository;
    private final PlansProductsRepository plansProductsRepository;
    private final PlansRecipesRepository plansRecipesRepository;

    public PlanService(
            PlanRepository planRepository,
            PlansProductsRepository plansProductsRepository,
            PlansRecipesRepository plansRecipesRepository) {
        this.planRepository = planRepository;
        this.plansProductsRepository = plansProductsRepository;
        this.plansRecipesRepository = plansRecipesRepository;
    }
}
