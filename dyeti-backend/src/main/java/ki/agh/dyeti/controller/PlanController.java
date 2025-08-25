package ki.agh.dyeti.controller;

import java.util.List;
import ki.agh.dyeti.dto.PlanDTO;
import ki.agh.dyeti.dto.request.PlanRequestDTO;
import ki.agh.dyeti.model.User;
import ki.agh.dyeti.security.CurrentUserProvider;
import ki.agh.dyeti.service.PlanService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/plans")
public class PlanController {
    private final PlanService planService;
    private final CurrentUserProvider currentUserProvider;

    public PlanController(PlanService planService, CurrentUserProvider currentUserProvider) {
        this.planService = planService;
        this.currentUserProvider = currentUserProvider;
    }

    @PostMapping()
    public ResponseEntity<String> generatePlan(@RequestBody PlanRequestDTO planRequest) {
        User user =
                currentUserProvider.getCurrentUser().orElseThrow(() -> new RuntimeException("User not authenticated"));

        planService.startPlanGeneration(planRequest, user);

        return ResponseEntity.ok("Plan generation started");
    }

    @GetMapping()
    public List<PlanDTO> getAllPlans() {
        User user =
                currentUserProvider.getCurrentUser().orElseThrow(() -> new RuntimeException("User not authenticated"));

        return planService.getAllPlans(user);
    }
}
