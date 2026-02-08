package ki.agh.dyeti.controller;

import java.util.List;
import ki.agh.dyeti.dto.PlanDTO;
import ki.agh.dyeti.service.PlanService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/plans")
@PreAuthorize("hasAnyRole('ADMIN','OWNER')")
public class AdminPlanController {
    private final PlanService planService;

    public AdminPlanController(PlanService planService) {
        this.planService = planService;
    }

    @GetMapping()
    public List<PlanDTO> getAllPlans() {
        return planService.getAllPlans();
    }
}
