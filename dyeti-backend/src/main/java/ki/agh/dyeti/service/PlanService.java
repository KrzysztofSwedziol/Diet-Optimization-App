package ki.agh.dyeti.service;

import ki.agh.dyeti.repository.PlanRepository;
import org.springframework.stereotype.Service;

@Service
public class PlanService {
    private final PlanRepository planRepository;

    public PlanService(PlanRepository planRepository) {
        this.planRepository = planRepository;
    }
}
