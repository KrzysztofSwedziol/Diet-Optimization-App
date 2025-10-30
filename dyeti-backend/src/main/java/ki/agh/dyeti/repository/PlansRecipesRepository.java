package ki.agh.dyeti.repository;

import ki.agh.dyeti.model.PlansRecipes;
import ki.agh.dyeti.model.util.PlansRecipesId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface PlansRecipesRepository extends JpaRepository<PlansRecipes, PlansRecipesId> {
    @Modifying
    @Query(value = "INSERT INTO plans_recipes (plan_id, recipe_id) VALUES (:planId, :recipeId)", nativeQuery = true)
    void linkPlanWithRecipe(@Param("planId") Long planId, @Param("recipeId") Long recipeId);
}
