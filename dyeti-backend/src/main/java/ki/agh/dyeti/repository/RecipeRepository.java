package ki.agh.dyeti.repository;

import ki.agh.dyeti.model.Recipe;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RecipeRepository extends JpaRepository<Recipe, Long> {
    // TODO needed queries
}
