package ki.agh.dyeti.controller;

import jakarta.validation.constraints.NotBlank;
import java.util.List;
import ki.agh.dyeti.dto.PlanDTO;
import ki.agh.dyeti.dto.request.PlanRequestDTO;
import ki.agh.dyeti.dto.request.PlanUpdateDTO;
import ki.agh.dyeti.model.User;
import ki.agh.dyeti.service.PlanService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
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

    @PostMapping()
    public ResponseEntity<String> generatePlan(
            @AuthenticationPrincipal User user, @RequestBody PlanRequestDTO planRequest) {
        planService.startPlanGeneration(planRequest, user);
        return ResponseEntity.ok("Plan generation started");
    }

    @GetMapping()
    public List<PlanDTO> getUserPlans(@AuthenticationPrincipal User user) {
        return planService.getUserPlans(user.getId());
    }

    @GetMapping("/{id}")
    public PlanDTO getPlan(@PathVariable Long id) {
        return planService.getPlan(id);
    }

    @PutMapping("/{id}")
    public PlanDTO updatePlan(@PathVariable Long id, @RequestBody PlanUpdateDTO planRequest) {
        return planService.updatePlan(id, planRequest);
    }

    @DeleteMapping("{id}")
    public PlanDTO deletePlan(@PathVariable Long id) {
        return planService.deletePlan(id);
    }
}
