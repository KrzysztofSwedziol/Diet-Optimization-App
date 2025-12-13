package ki.agh.dyeti.controller;

import java.util.List;
import ki.agh.dyeti.dto.MealDTO;
import ki.agh.dyeti.model.Plan;
import ki.agh.dyeti.service.MealService;
import ki.agh.dyeti.service.PlanService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/meal")
public class MealController {

    private final MealService mealService;
    private final PlanService planService;

    public MealController(MealService mealService, PlanService planService) {
        this.mealService = mealService;
        this.planService = planService;
    }

    @GetMapping()
    public List<MealDTO> getAllMeals() {
        return mealService.getAllMeals();
    }

    @GetMapping("/{mealId}")
    public MealDTO getMeal(@PathVariable Long mealId) {
        return mealService.getMealById(mealId);
    }

    @GetMapping("/plan/{planId}")
    public List<MealDTO> getMealsByPlanId(@PathVariable Long planId) {
        return mealService.getMealsByPlanId(planId);
    }

    @PostMapping("/distribute")
    public List<MealDTO> distributePlanToMeals(@RequestParam Long planId, @RequestParam int mealQuantity) {
        Plan plan = planService.getPlanById(planId);

        mealService.distributeProductsToMeals(plan, mealQuantity);

        return mealService.getMealsByPlanId(planId);
    }

    @PutMapping("/{mealId}")
    public MealDTO replaceMeal(@PathVariable Long mealId, @RequestBody MealDTO newMealData) {
        return mealService.replaceMeal(mealId, newMealData);
    }

    @PatchMapping("/{mealId}")
    public MealDTO updateMealPartially(@PathVariable Long mealId, @RequestBody MealDTO patch) {
        return mealService.updateMealPartially(mealId, patch);
    }

    @DeleteMapping("/{mealId}")
    public void deleteMeal(@PathVariable Long mealId) {
        mealService.deleteMeal(mealId);
    }
}
