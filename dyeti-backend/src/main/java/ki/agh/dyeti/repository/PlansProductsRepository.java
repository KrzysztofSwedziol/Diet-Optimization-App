package ki.agh.dyeti.repository;

import ki.agh.dyeti.model.PlansProducts;
import ki.agh.dyeti.model.util.PlansProductsId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlansProductsRepository extends JpaRepository<PlansProducts, PlansProductsId> {}
