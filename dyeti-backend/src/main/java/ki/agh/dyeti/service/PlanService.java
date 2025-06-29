package ki.agh.dyeti.service;

import jakarta.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import ki.agh.dyeti.dto.PlanDTO;
import ki.agh.dyeti.dto.request.PlanRequestDTO;
import ki.agh.dyeti.model.*;
import ki.agh.dyeti.repository.PlanRepository;
import ki.agh.dyeti.service.generator.PlanGenerator;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
public class PlanService {

    private final PlanRepository planRepository;
    private final ProductPreferenceService productPreferenceService;
    private final PlanGenerator planGenerator;

    public PlanService(
            PlanRepository planRepository,
            ProductPreferenceService productPreferenceService,
            PlanGenerator planGenerator) {
        this.planRepository = planRepository;
        this.productPreferenceService = productPreferenceService;
        this.planGenerator = planGenerator;
    }

    public List<PlanDTO> getAllPlans(User user) {
        if (user.getRole() == Role.ADMIN || user.getRole() == Role.OWNER) {
            return planRepository.findAll().stream().map(PlanDTO::fromEntity).collect(Collectors.toList());
        }
        return planRepository.findByOwner(user).stream()
                .map(PlanDTO::fromEntity)
                .collect(Collectors.toList());
    }

    @Transactional
    @Async
    public void startPlanGeneration(PlanRequestDTO planRequestDTO, User user) {
        Map<Product, Double> productPreferences =
                productPreferenceService.getProductPreferencesMapByUserId(user.getId());
        if (productPreferences.isEmpty()) {
            throw new IllegalStateException("No preferences found for user.");
        }

        // Create Plan with targets but NO products yet
        Plan plan = Plan.builder()
                .name("Generated Plan")
                .description("Automatically generated diet plan")
                .owner(user)
                .caloriesTarget(planRequestDTO.caloriesTarget())
                .proteinsTarget(planRequestDTO.proteinsTarget())
                .carbsTarget(planRequestDTO.carbsTarget())
                .fatsTarget(planRequestDTO.fatsTarget())
                .products(new ArrayList<>()) // empty for now
                .build();

        // Save plan to get the ID assigned
        Plan savedPlan = planRepository.save(plan);

        // Now generate the plan filling products etc, passing savedPlan with ID
        Plan generatedPlan = planGenerator.generate(savedPlan, productPreferences);

        // Save again to persist products with proper IDs
        planRepository.save(generatedPlan);
    }
}
