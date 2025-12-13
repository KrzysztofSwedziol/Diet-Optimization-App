package ki.agh.dyeti.repository;

import java.util.List;
import ki.agh.dyeti.model.Meal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MealRepository extends JpaRepository<Meal, Long> {

    List<Meal> findAllByPlanOwnerId(Long ownerId);

    List<Meal> findAllByPlanId(Long planId);
}
