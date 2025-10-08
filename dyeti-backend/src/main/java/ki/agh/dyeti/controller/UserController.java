package ki.agh.dyeti.controller;

import ki.agh.dyeti.dto.UserStatsDTO;
import ki.agh.dyeti.model.User;
import ki.agh.dyeti.service.CustomUserDetailsService;
import ki.agh.dyeti.service.UserStatsService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/user")
public class UserController {
    private final CustomUserDetailsService userService;
    private final UserStatsService userStatsService;

    public UserController(CustomUserDetailsService userService, UserStatsService userStatsService) {
        this.userService = userService;
        this.userStatsService = userStatsService;
    }

    @GetMapping("/stats")
    @PreAuthorize("hasAnyRole('USER')")
    public UserStatsDTO getUserPlans(@AuthenticationPrincipal User user) {
        return userStatsService.getUserStats(user.getId());
    }
}
