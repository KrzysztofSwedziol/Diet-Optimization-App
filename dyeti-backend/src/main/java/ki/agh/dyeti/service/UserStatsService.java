package ki.agh.dyeti.service;

import ki.agh.dyeti.dto.UserStatsDTO;
import ki.agh.dyeti.repository.PlanRepository;
import ki.agh.dyeti.repository.ProductPreferenceRepository;
import ki.agh.dyeti.repository.ProductRepository;
import ki.agh.dyeti.repository.RecipeRepository;
import ki.agh.dyeti.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserStatsService {
    private final UserRepository userRepository;
    private final RecipeRepository recipeRepository;
    private final ProductRepository productRepository;
    private final ProductPreferenceRepository productPreferenceRepository;
    private final PlanRepository planRepository;

    public UserStatsService(
            UserRepository userRepository,
            RecipeRepository recipeRepository,
            ProductRepository productRepository,
            ProductPreferenceRepository productPreferenceRepository,
            PlanRepository planRepository) {
        this.userRepository = userRepository;
        this.recipeRepository = recipeRepository;
        this.productRepository = productRepository;
        this.productPreferenceRepository = productPreferenceRepository;
        this.planRepository = planRepository;
    }

    public UserStatsDTO getUserStats(long userId) {
        long productPrefsCount =
                productPreferenceRepository.findByOwnerId(userId).size();
        long plansCount = planRepository.findByOwnerId(userId).size();
        long createdRecipesCount = recipeRepository.findByOwnerId(userId).size();
        long createdProductsCount = productRepository.findByOwnerId(userId).size();
        return new UserStatsDTO(productPrefsCount, plansCount, createdRecipesCount, createdProductsCount);
    }
}
