package ki.agh.dyeti.repository;

import ki.agh.dyeti.model.Product;
import ki.agh.dyeti.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product, Long> {

    Optional<Product> findByName(String name);

    List<Product> findAllByOwnerIsNullOrOwner(User owner);

}
