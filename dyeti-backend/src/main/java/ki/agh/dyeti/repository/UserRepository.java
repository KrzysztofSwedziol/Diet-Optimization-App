package ki.agh.dyeti.repository;

import java.util.Optional;
import ki.agh.dyeti.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {
  Optional<User> findByUsername(String username);
  Optional<User> findByEmail(String email);
}
