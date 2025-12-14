package ki.agh.dyeti.service;

import jakarta.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import ki.agh.dyeti.dto.PlanDTO;
import ki.agh.dyeti.dto.request.PlanRequestDTO;
import ki.agh.dyeti.dto.request.PlanUpdateDTO;
import ki.agh.dyeti.exception.ResourceNotFoundException;
import ki.agh.dyeti.model.*;
import ki.agh.dyeti.repository.PlanRepository;
import ki.agh.dyeti.security.ResourceAccessValidator;
import ki.agh.dyeti.service.generator.PlanGenerator;
import org.springframework.stereotype.Service;

@Service
public class PlanService {

    private final PlanRepository planRepository;
    private final ProductPreferenceService productPreferenceService;
    private final ResourceAccessValidator resourceAccessValidator;
    private final PlanGenerator planGenerator;
    private final RecipeService recipeService;

    public PlanService(
            PlanRepository planRepository,
            ProductPreferenceService productPreferenceService,
            ResourceAccessValidator resourceAccessValidator,
            PlanGenerator planGenerator,
            RecipeService recipeService) {
        this.planRepository = planRepository;
        this.productPreferenceService = productPreferenceService;
        this.resourceAccessValidator = resourceAccessValidator;
        this.planGenerator = planGenerator;
        this.recipeService = recipeService;
    }

    public List<PlanDTO> getUserPlans(Long userId) {
        return planRepository.findByOwnerId(userId).stream()
                .map(PlanDTO::fromEntity)
                .collect(Collectors.toList());
    }

    public List<PlanDTO> getTopUserPlans(Long userId, int limit) {
        return planRepository.findByOwnerIdOrderByCreatedAtDesc(userId).stream()
                .limit(limit)
                .map(PlanDTO::fromEntity)
                .collect(Collectors.toList());
    }

    public List<PlanDTO> getAllPlans() {
        return planRepository.findAll().stream().map(PlanDTO::fromEntity).collect(Collectors.toList());
    }

    public PlanDTO getPlan(Long id) {
        Plan plan = planRepository
                .findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Plan with id " + id + " not found"));

        resourceAccessValidator.validateOwnership(plan);

        return PlanDTO.fromEntity(plan);
    }

    public PlanDTO updatePlan(Long id, PlanUpdateDTO planUpdateDTO) {
        Plan plan = planRepository
                .findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Plan with id " + id + " not found"));

        resourceAccessValidator.validateOwnership(plan);

        if (planUpdateDTO.name() != null) {
            plan.setName(planUpdateDTO.name());
        }

        if (planUpdateDTO.description() != null) {
            plan.setDescription(planUpdateDTO.description());
        }

        Plan updated = planRepository.save(plan);
        return PlanDTO.fromEntity(updated);
    }

    public PlanDTO deletePlan(Long id) {
        Plan plan = planRepository
                .findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Plan with id " + id + " not found"));

        resourceAccessValidator.validateOwnership(plan);

        planRepository.delete(plan);

        return PlanDTO.fromEntity(plan);
    }

    @Transactional
    public void startPlanGeneration(PlanRequestDTO planRequestDTO, User user) {
        Map<Product, Double> productPreferences =
                productPreferenceService.getProductPreferencesMapByUserId(user.getId());
        if (productPreferences.isEmpty()) {
            throw new IllegalStateException("No preferences found for user.");
        }

        // Create Plan with targets but NO products yet
        Plan plan = Plan.builder()
                .name(planRequestDTO.name())
                .description(planRequestDTO.description())
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
        generatedPlan.setCreatedAt(LocalDateTime.now());

        // Save again to persist products with proper IDs
        planRepository.save(generatedPlan);
        // recipeService.generateRecipeBasedOnPlan(generatedPlan, user);
    }

    public boolean existsByName(Long userId, String name) {
        return planRepository.findPlanByNameAndOwnerId(name, userId).isPresent();
    }
}
