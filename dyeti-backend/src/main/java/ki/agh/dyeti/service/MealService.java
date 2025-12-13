package ki.agh.dyeti.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import ki.agh.dyeti.dto.*;
import ki.agh.dyeti.model.*;
import ki.agh.dyeti.repository.MealRepository;
import ki.agh.dyeti.repository.PlanRepository;
import ki.agh.dyeti.repository.ProductRepository;
import ki.agh.dyeti.security.CurrentUserProvider;
import org.springframework.stereotype.Service;

@Service
public class MealService {

    private final MealRepository mealRepository;
    private final CurrentUserProvider currentUserProvider;
    private final ProductRepository productRepository;
    private final LLMService llmService;
    private final ObjectMapper objectMapper;
    private final PlanRepository planRepository;

    public MealService(
            MealRepository mealRepository,
            CurrentUserProvider currentUserProvider,
            ProductRepository productRepository,
            LLMService llmService,
            ObjectMapper objectMapper,
            PlanRepository planRepository) {
        this.mealRepository = mealRepository;
        this.currentUserProvider = currentUserProvider;
        this.productRepository = productRepository;
        this.llmService = llmService;
        this.objectMapper = objectMapper;
        this.planRepository = planRepository;
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
        try {
            String json = llmService.generateMealsAndRecipes(plan, mealQuantity);

            List<GeneratedMealDTO> generated = parseGeneratedMeals(json);
            List<Meal> meals = createMealsFromDto(plan, generated);
            plan.getMeals().clear();
            plan.getMeals().addAll(meals);

            planRepository.save(plan);

        } catch (IOException e) {
            throw new RuntimeException("Error while distributing products to meals", e);
        }
    }

    public List<GeneratedMealDTO> parseGeneratedMeals(String json) {
        try {
            MealResponseDTO response = objectMapper.readValue(json, MealResponseDTO.class);
            return response.meals();
        } catch (Exception e) {
            throw new RuntimeException("Failed to parse LLM JSON to DTOs", e);
        }
    }

    public List<Meal> createMealsFromDto(Plan plan, List<GeneratedMealDTO> generatedMeals) {
        List<Meal> meals = new ArrayList<>();

        for (GeneratedMealDTO gm : generatedMeals) {
            Meal meal = new Meal();
            meal.setPlan(plan);
            meal.setOrderInDay(gm.orderInDay());

            List<MealProduct> mealProducts = new ArrayList<>();
            if (gm.products() != null) {
                for (GeneratedProductDTO gp : gm.products()) {
                    String productName = gp.name();
                    double amount = extractAmountAsDouble(gp.amount());

                    Product product = productRepository
                            .findByName(productName)
                            .orElseThrow(() -> new IllegalStateException("Product not found: " + productName));

                    MealProduct mp = MealProduct.builder()
                            .meal(meal)
                            .product(product)
                            .quantity(amount)
                            .build();

                    mealProducts.add(mp);
                }
            }
            meal.setProducts(mealProducts);

            List<Recipe> recipes = new ArrayList<>();
            if (gm.recipes() != null) {
                for (GeneratedRecipeDTO gr : gm.recipes()) {
                    Recipe r = new Recipe();
                    r.setRecipeName(gr.name());
                    r.setDescription(gr.description() == null ? "" : gr.description());
                    List<String> stepsList = gr.steps() == null ? List.of() : gr.steps();
                    r.setSteps(String.join("\n", stepsList));
                    r.setMeal(meal);
                    r.setOwner(plan.getOwner());
                    recipes.add(r);
                }
            }
            meal.setRecipes(recipes);

            meals.add(meal);
        }

        return meals;
    }

    private double extractAmountAsDouble(String txt) {
        try {
            String digits = txt.replaceAll("[^0-9.]", "");
            return Double.parseDouble(digits);
        } catch (Exception e) {
            return 0.0;
        }
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
                                r.setOwner(meal.getPlan().getOwner());
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
