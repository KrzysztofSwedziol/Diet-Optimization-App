package ki.agh.dyeti.repository;

import java.util.List;
import ki.agh.dyeti.model.Recipe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface RecipeRepository extends JpaRepository<Recipe, Long> {
    @Query("SELECT r FROM Recipe r WHERE r.creator.id = :creatorId")
    List<Recipe> findAllByCreatorId(@Param("creatorId") Long creatorId);
}
