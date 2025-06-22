package ki.agh.dyeti.repository;

import ki.agh.dyeti.model.ProductPreference;
import ki.agh.dyeti.model.util.ProductPreferenceId;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductPreferenceRepository extends JpaRepository<ProductPreference, ProductPreferenceId> {
    List<ProductPreference> findByOwnerId(Long ownerId);
}
