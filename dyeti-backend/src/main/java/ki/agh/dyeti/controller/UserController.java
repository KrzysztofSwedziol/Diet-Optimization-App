package ki.agh.dyeti.controller;

import jakarta.validation.Valid;
import java.util.Map;
import ki.agh.dyeti.dto.UserStatsDTO;
import ki.agh.dyeti.dto.request.ChangePasswordRequest;
import ki.agh.dyeti.dto.request.UpdateProfileRequest;
import ki.agh.dyeti.model.User;
import ki.agh.dyeti.service.CustomUserDetailsService;
import ki.agh.dyeti.service.UserStatsService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/user")
@PreAuthorize("hasAnyRole('USER')")
public class UserController {
    private final CustomUserDetailsService userService;
    private final UserStatsService userStatsService;

    public UserController(CustomUserDetailsService userService, UserStatsService userStatsService) {
        this.userService = userService;
        this.userStatsService = userStatsService;
    }

    @GetMapping("/stats")
    public UserStatsDTO getUserPlans(@AuthenticationPrincipal User user) {
        return userStatsService.getUserStats(user.getId());
    }

    @PatchMapping("/change-password")
    public ResponseEntity<Map<String, String>> changePassword(
            @AuthenticationPrincipal User user, @Valid @RequestBody ChangePasswordRequest changePasswordRequest) {
        userService.changePassword(user.getId(), changePasswordRequest);
        return ResponseEntity.ok(Map.of("message", "Password changed"));
    }

    @PatchMapping("")
    public ResponseEntity<Map<String, String>> updateProfile(
            @AuthenticationPrincipal User user, @Valid @RequestBody UpdateProfileRequest request) {
        userService.updateProfile(user.getId(), request);
        return ResponseEntity.ok(Map.of("message", "Profile updated"));
    }
}
