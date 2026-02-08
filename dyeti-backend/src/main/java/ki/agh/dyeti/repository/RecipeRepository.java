package ki.agh.dyeti.repository;

import java.util.List;
import ki.agh.dyeti.model.Recipe;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RecipeRepository extends JpaRepository<Recipe, Long> {
    List<Recipe> findByOwnerId(Long id);
    // TODO needed queries
}
