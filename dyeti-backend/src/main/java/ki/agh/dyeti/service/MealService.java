package ki.agh.dyeti.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import ki.agh.dyeti.dto.MealDTO;
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
            ProductRepository productRepository, LLMService llmService, ObjectMapper objectMapper, PlanRepository planRepository) {
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
        //try {
//            String json = llmService.generateMealsAndRecipesJson(plan, mealQuantity);

            //do testowania :
            String json = """
            [
              {
                "orderInDay": 1,
                "products": [
                  { "name": "Banana", "amount": "120g" },
                  { "name": "Oatmeal", "amount": "50g" }
                ],
                "recipes": [
                  {
                    "name": "Banana Oatmeal",
                    "description": "A quick and healthy breakfast with banana and oatmeal.",
                    "steps": ["Peel the banana and slice it.", "Mix with oatmeal in a bowl.", "Add a splash of milk and serve."]
                  }
                ]
              },
              {
                "orderInDay": 2,
                "products": [
                  { "name": "Chicken Breast", "amount": "200g" },
                  { "name": "Rice", "amount": "100g" },
                  { "name": "Broccoli", "amount": "80g" }
                ],
                "recipes": [
                  {
                    "name": "Chicken and Rice with Broccoli",
                    "description": "Hearty lunch with protein and veggies.",
                    "steps": ["Cook the chicken until golden.", "Boil the rice.", "Steam the broccoli.", "Combine all ingredients and season."]
                  }
                ]
              },
              {
                "orderInDay": 3,
                "products": [
                  { "name": "Apple", "amount": "150g" },
                  { "name": "Yogurt", "amount": "100g" }
                ],
                "recipes": [
                  {
                    "name": "Apple Yogurt Snack",
                    "description": "Simple and healthy snack.",
                    "steps": ["Cut the apple into small pieces.", "Mix with yogurt.", "Serve chilled."]
                  }
                ]
              }
            ]
            """;

            List<Meal> meals = createMealsFromJson(plan, json);
            plan.getMeals().clear();
            plan.getMeals().addAll(meals);

            planRepository.save(plan);

//        }catch (IOException e) {
//            throw new RuntimeException("Error while distributing products to meals", e);
//        }
    }

    public List<Meal> createMealsFromJson(Plan plan, String json) {
        List<Meal> meals = new ArrayList<>();
        try {
            JsonNode root = objectMapper.readTree(json);
            if (!root.isArray()) {
                throw new IllegalStateException("Expected JSON array of meals");
            }

            for (JsonNode mealNode : root) {
                Meal meal = new Meal();
                meal.setPlan(plan);
                meal.setOrderInDay(mealNode.path("orderInDay").asInt(0));

                List<MealProduct> mealProducts = new ArrayList<>();
                for (JsonNode productNode : mealNode.path("products")) {
                    String productName = productNode.path("name").asText();
                    double amount = extractAmountAsDouble(productNode.path("amount").asText());

                    Product product = productRepository.findByName(productName)
                            .orElseThrow(() -> new IllegalStateException("Product not found: " + productName));

                    MealProduct mp = MealProduct.builder()
                            .meal(meal)
                            .product(product)
                            .quantity(amount)
                            .build();

                    mealProducts.add(mp);
                }
                meal.setProducts(mealProducts);

                List<Recipe> recipes = new ArrayList<>();
                for (JsonNode recipeNode : mealNode.path("recipes")) {
                    Recipe r = new Recipe();
                    r.setRecipeName(recipeNode.path("name").asText());
                    r.setDescription(recipeNode.path("description").asText(""));
                    r.setSteps(recipeNode.path("steps").asText(""));
                    r.setMeal(meal);
                    r.setOwner(plan.getOwner());
                    recipes.add(r);
                }
                meal.setRecipes(recipes);

                meals.add(meal);
            }

            return meals;

        } catch (Exception e) {
            throw new RuntimeException("Failed to create meals from JSON", e);
        }
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