package ki.agh.dyeti.config;

import java.util.List;
import ki.agh.dyeti.model.Unit;
import ki.agh.dyeti.repository.UnitRepository;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataInitializer {

    @Bean
    public ApplicationRunner initializeUnits(UnitRepository unitRepository) {
        return args -> {
            List<Unit> defaultUnits = List.of(
                    new Unit(null, "gram", "g"), new Unit(null, "milliliter", "ml"), new Unit(null, "piece", "pc"));

            defaultUnits.stream()
                    .filter(unit -> !unitRepository.existsByName(unit.getName()))
                    .forEach(unitRepository::save);
        };
    }
}
