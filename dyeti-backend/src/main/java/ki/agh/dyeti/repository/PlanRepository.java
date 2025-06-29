package ki.agh.dyeti.repository;

import ki.agh.dyeti.model.Plan;
import ki.agh.dyeti.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PlanRepository extends JpaRepository<Plan, Long> {
    List<Plan> findByOwner(User owner);
}
