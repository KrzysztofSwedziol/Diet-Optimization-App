package ki.agh.dyeti.controller;

import jakarta.validation.constraints.NotBlank;
import ki.agh.dyeti.model.User;
import ki.agh.dyeti.service.PlanService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
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
}
