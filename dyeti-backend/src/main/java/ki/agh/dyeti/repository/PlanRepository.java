package ki.agh.dyeti.repository;

import java.util.List;
import java.util.Optional;
import ki.agh.dyeti.model.Plan;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlanRepository extends JpaRepository<Plan, Long> {

    Optional<Plan> findPlanByPlanNameAndUserId(String planName, Long userId);

    List<Plan> findByOwnerId(Long ownerId);
}
