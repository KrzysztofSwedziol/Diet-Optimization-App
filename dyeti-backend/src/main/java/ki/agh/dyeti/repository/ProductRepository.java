package ki.agh.dyeti.repository;

import ki.agh.dyeti.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {}
