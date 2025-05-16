package ki.agh.dyeti.repository;

import ki.agh.dyeti.model.PlansRecipes;
import ki.agh.dyeti.model.util.PlansRecipesId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlansRecipesRepository extends JpaRepository<PlansRecipes, PlansRecipesId> {}
