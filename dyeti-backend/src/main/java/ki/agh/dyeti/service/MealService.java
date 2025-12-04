package ki.agh.dyeti.service;

import java.util.List;
import java.util.stream.Collectors;
import ki.agh.dyeti.dto.MealDTO;
import ki.agh.dyeti.model.Meal;
import ki.agh.dyeti.model.Plan;
import ki.agh.dyeti.model.Recipe;
import ki.agh.dyeti.model.Role;
import ki.agh.dyeti.model.User;
import ki.agh.dyeti.repository.MealRepository;
import ki.agh.dyeti.repository.ProductRepository;
import ki.agh.dyeti.security.CurrentUserProvider;
import org.springframework.stereotype.Service;

@Service
public class MealService {

    private final MealRepository mealRepository;
    private final CurrentUserProvider currentUserProvider;
    private final ProductRepository productRepository;

    public MealService(
            MealRepository mealRepository,
            CurrentUserProvider currentUserProvider,
            ProductRepository productRepository) {
        this.mealRepository = mealRepository;
        this.currentUserProvider = currentUserProvider;
        this.productRepository = productRepository;
    }

    public List<MealDTO> getAllMeals() {
        User currentUser = currentUserProvider
                .getCurrentUser()
                .orElseThrow(() -> new IllegalStateException("Current user is not logged in"));

        if (currentUser.getRole() == Role.ADMIN) {
            return mealRepository.findAll().stream().map(MealDTO::fromEntity).collect(Collectors.toList());
        }
        return mealRepository.findAllByPlanOwnerId(currentUser.getId()).stream()
                .map(MealDTO::fromEntity)
                .collect(Collectors.toList());
    }

    public MealDTO getMealById(Long mealId) {
        Meal meal = mealRepository.findById(mealId).orElseThrow(() -> new RuntimeException("Meal not found"));
        return MealDTO.fromEntity(meal);
    }

    public List<MealDTO> getMealsByPlanId(Long planId) {
        return mealRepository.findAllByPlanId(planId).stream()
                .map(MealDTO::fromEntity)
                .collect(Collectors.toList());
    }

    public void distributeProductsToMeals(Plan plan, int mealQuantity) {
        // Tu będzie logika do podziału produktów na posiłki
    }

    public MealDTO replaceMeal(Long mealId, MealDTO newMealData) {
        Meal meal = mealRepository.findById(mealId).orElseThrow(() -> new RuntimeException("Meal not found"));

        if (newMealData == null) {
            throw new IllegalArgumentException("Meal data cannot be null");
        }

        if (newMealData.orderInDay() == null) {
            throw new IllegalArgumentException("orderInDay must be provided");
        }

        if (newMealData.products() == null || newMealData.products().isEmpty()) {
            throw new IllegalArgumentException("Meal must have at least one product");
        }

        if (newMealData.recipes() == null || newMealData.recipes().isEmpty()) {
            throw new IllegalArgumentException("Meal must have at least one recipe");
        }

        meal.setOrderInDay(newMealData.orderInDay());

        meal.getProducts().clear();
        meal.getProducts()
                .addAll(newMealData.products().stream()
                        .map(dto -> dto.toEntity(meal, productRepository))
                        .toList());

        meal.getRecipes().clear();
        meal.getRecipes()
                .addAll(newMealData.recipes().stream()
                        .map(dto -> {
                            Recipe r = new Recipe();
                            r.setRecipeName(dto.recipeName());
                            r.setDescription(dto.description());
                            r.setSteps(String.join("\n", dto.steps()));

                            r.setMeal(meal);
                            r.setOwner(meal.getPlan().getOwner());
                            return r;
                        })
                        .collect(Collectors.toList()));

        Meal saved = mealRepository.save(meal);
        return MealDTO.fromEntity(saved);
    }

    public MealDTO updateMealPartially(Long mealId, MealDTO patch) {
        Meal meal = mealRepository.findById(mealId).orElseThrow(() -> new RuntimeException("Meal not found"));

        if (patch.orderInDay() != null) {
            meal.setOrderInDay(patch.orderInDay());
        }

        if (patch.products() != null) {
            meal.getProducts().clear();
            meal.getProducts()
                    .addAll(patch.products().stream()
                            .map(dto -> dto.toEntity(meal, productRepository))
                            .toList());
        }

        if (patch.recipes() != null) {
            meal.getRecipes().clear();
            meal.getRecipes()
                    .addAll(patch.recipes().stream()
                            .map(dto -> {
                                Recipe r = new Recipe();
                                r.setRecipeName(dto.recipeName());
                                r.setDescription(dto.description());
                                r.setSteps(String.join("\n", dto.steps()));
                                r.setMeal(meal);
                                r.setOwner(meal.getPlan().getOwner()); // przypisanie właściciela
                                return r;
                            })
                            .collect(Collectors.toList()));
        }

        Meal saved = mealRepository.save(meal);
        return MealDTO.fromEntity(saved);
    }

    public void deleteMeal(Long mealId) {
        if (!mealRepository.existsById(mealId)) {
            throw new RuntimeException("Meal not found");
        }
        mealRepository.deleteById(mealId);
    }
}
