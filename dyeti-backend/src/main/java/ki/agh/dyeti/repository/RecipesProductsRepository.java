package ki.agh.dyeti.repository;

import ki.agh.dyeti.model.RecipesProducts;
import ki.agh.dyeti.model.util.RecipesProductsId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RecipesProductsRepository extends JpaRepository<RecipesProducts, RecipesProductsId> {
    // TODO needed queries
}
