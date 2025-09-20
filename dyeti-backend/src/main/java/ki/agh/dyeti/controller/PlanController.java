package ki.agh.dyeti.controller;

import jakarta.validation.constraints.NotBlank;
import java.time.LocalDateTime;
import ki.agh.dyeti.dto.PlanDTO;
import ki.agh.dyeti.dto.request.PlanGenerationRequestDTO;
import ki.agh.dyeti.model.Plan;
import ki.agh.dyeti.model.User;
import ki.agh.dyeti.service.PlanService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/plans")
@PreAuthorize("hasRole('USER')")
public class PlanController {
    private final PlanService planService;

    public PlanController(PlanService planService) {
        this.planService = planService;
    }

    @Validated
    @GetMapping("/available")
    public ResponseEntity<Boolean> checkNameAvailability(
            @RequestParam @NotBlank String name, @AuthenticationPrincipal User user) {
        boolean exists = planService.existsByName(user.getId(), name.trim());
        return ResponseEntity.ok(!exists);
    }
    // TODO: change it to actually generating plan,
    // if you will renaming this endpoint remember to change it on frontend too both KEYS and mutation
    @Validated
    @PostMapping("/products/new")
    public ResponseEntity<PlanDTO> generateNewPlan(
            @RequestBody PlanGenerationRequestDTO request, @AuthenticationPrincipal User user) {
        LocalDateTime now = LocalDateTime.now();
        Plan plan = Plan.builder()
                .planName(request.name())
                .planDescription(request.description())
                .planDate(now)
                .energyReq(request.calories())
                .proteinReq(request.protein())
                .carbsReq(request.carbs())
                .fatReq(request.fats())
                .user(user)
                .build();
        PlanDTO generatedPlan = PlanDTO.fromEntity(plan);
        return ResponseEntity.ok(generatedPlan);
    }
}
