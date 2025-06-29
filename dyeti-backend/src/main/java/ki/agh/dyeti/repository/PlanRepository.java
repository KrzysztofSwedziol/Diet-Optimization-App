package ki.agh.dyeti.repository;

import java.util.List;
import ki.agh.dyeti.model.Plan;
import ki.agh.dyeti.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlanRepository extends JpaRepository<Plan, Long> {
    List<Plan> findByOwner(User owner);
}
