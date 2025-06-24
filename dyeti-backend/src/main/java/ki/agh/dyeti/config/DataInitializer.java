package ki.agh.dyeti.config;

import java.util.List;
import ki.agh.dyeti.model.Role;
import ki.agh.dyeti.model.Unit;
import ki.agh.dyeti.model.User;
import ki.agh.dyeti.model.util.Gender;
import ki.agh.dyeti.repository.UnitRepository;
import ki.agh.dyeti.service.CustomUserDetailsService;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DataInitializer {

    @Bean
    public ApplicationRunner initializeUnits(
            UnitRepository unitRepository, PasswordEncoder passwordEncoder, CustomUserDetailsService userService) {
        return args -> {
            List<Unit> defaultUnits = List.of(
                    new Unit(null, "gram", "g"), new Unit(null, "milliliter", "ml"), new Unit(null, "piece", "pc"));

            defaultUnits.stream()
                    .filter(unit -> !unitRepository.existsByName(unit.getName()))
                    .forEach(unitRepository::save);

            List<User> sampleUsers = List.of(
                    User.builder()
                            .username("john_doe")
                            .email("john@example.com")
                            .password(passwordEncoder.encode("Password123!"))
                            .age(28)
                            .gender(Gender.MALE)
                            .height(180)
                            .weight(75)
                            .energyReq(2500)
                            .proteinReq(150)
                            .carbsReq(300)
                            .fatReq(70)
                            .role(Role.USER)
                            .build(),
                    User.builder()
                            .username("emma_watson")
                            .email("emma@example.com")
                            .password(passwordEncoder.encode("SecurePass456!"))
                            .age(32)
                            .gender(Gender.FEMALE)
                            .height(165)
                            .weight(58)
                            .energyReq(1800)
                            .proteinReq(110)
                            .carbsReq(220)
                            .fatReq(50)
                            .role(Role.USER)
                            .build(),
                    User.builder()
                            .username("admin_anna")
                            .email("anna.admin@example.com")
                            .password(passwordEncoder.encode("AdminPass789!"))
                            .age(35)
                            .gender(Gender.FEMALE)
                            .height(170)
                            .weight(65)
                            .energyReq(2100)
                            .proteinReq(130)
                            .carbsReq(250)
                            .fatReq(60)
                            .role(Role.ADMIN)
                            .build(),
                    User.builder()
                            .username("sysadmin_mike")
                            .email("mike.admin@example.com")
                            .password(passwordEncoder.encode("SysAdminPass!123"))
                            .age(42)
                            .gender(Gender.MALE)
                            .height(175)
                            .weight(80)
                            .energyReq(2800)
                            .proteinReq(160)
                            .carbsReq(350)
                            .fatReq(80)
                            .role(Role.ADMIN)
                            .build(),
                    User.builder()
                            .username("owner_tom")
                            .email("tom.owner@example.com")
                            .password(passwordEncoder.encode("OwnerMasterPass!"))
                            .age(50)
                            .gender(Gender.MALE)
                            .height(185)
                            .weight(85)
                            .energyReq(3000)
                            .proteinReq(180)
                            .carbsReq(380)
                            .fatReq(90)
                            .role(Role.OWNER)
                            .build(),
                    User.builder()
                            .username("sarah_c")
                            .email("sarah.c@example.com")
                            .password(passwordEncoder.encode("SarahPass123"))
                            .age(22)
                            .gender(Gender.FEMALE)
                            .height(160)
                            .weight(55)
                            .energyReq(1700)
                            .proteinReq(100)
                            .carbsReq(200)
                            .fatReq(45)
                            .role(Role.USER)
                            .build(),
                    User.builder()
                            .username("robert_k")
                            .email("robert.k@example.com")
                            .password(passwordEncoder.encode("RobertFit456"))
                            .age(45)
                            .gender(Gender.MALE)
                            .height(190)
                            .weight(90)
                            .energyReq(3200)
                            .proteinReq(200)
                            .carbsReq(400)
                            .fatReq(100)
                            .role(Role.USER)
                            .build(),
                    User.builder()
                            .username("lisa_m")
                            .email("lisa.m@example.com")
                            .password(passwordEncoder.encode("LisaYoga789"))
                            .age(29)
                            .gender(Gender.FEMALE)
                            .height(168)
                            .weight(60)
                            .energyReq(1900)
                            .proteinReq(120)
                            .carbsReq(230)
                            .fatReq(55)
                            .role(Role.USER)
                            .build());

            sampleUsers.stream().forEach(userService::saveUser);
        };
    }
}
