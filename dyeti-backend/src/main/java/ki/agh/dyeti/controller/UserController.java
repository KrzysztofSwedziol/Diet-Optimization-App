package ki.agh.dyeti.controller;

import jakarta.validation.Valid;
import java.util.List;
import java.util.Map;
import ki.agh.dyeti.dto.UserDTO;
import ki.agh.dyeti.dto.UserPasswordDTO;
import ki.agh.dyeti.model.Role;
import ki.agh.dyeti.model.User;
import ki.agh.dyeti.service.CustomUserDetailsService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {
    private final CustomUserDetailsService userService;

    public UserController(CustomUserDetailsService userService) {
        this.userService = userService;
    }

    @GetMapping("/me")
    public UserDTO getCurrentUser(@AuthenticationPrincipal User user) {
        return UserDTO.fromUser(userService.getUserById(user.getId()));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/{id}")
    public UserDTO getUserById(@PathVariable long id) {
        return UserDTO.fromUser(userService.getUserById(id));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/by-username/{username}")
    public UserDTO getUserByUsername(@PathVariable String username) {
        return UserDTO.fromUser(userService.getUserByUsername(username));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/by-email/{email}")
    public UserDTO getUserByEmail(@PathVariable String email) {
        return UserDTO.fromUser(userService.getUserByEmail(email));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping
    public List<UserDTO> getAllUsers() {
        return userService.getAll();
    }

    @PatchMapping("/me")
    public UserDTO updateProfile(@AuthenticationPrincipal User user, @RequestBody UserDTO userDTO) {
        return userService.updateUserProfile(user, userDTO);
    }

    @PostMapping("/{id}/password")
    public ResponseEntity<?> changePassword(
            @AuthenticationPrincipal User currentUser,
            @PathVariable Long id,
            @RequestBody @Valid UserPasswordDTO userPasswordDTO) {

        if (!currentUser.getId().equals(id)
                && !(currentUser.getRole() == Role.ADMIN || currentUser.getRole() == Role.OWNER)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Map.of("error", "Forbidden"));
        }

        userService.changePassword(id, userPasswordDTO);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/me")
    public ResponseEntity<?> deactivateLoggedUser(@AuthenticationPrincipal User user) {
        userService.deactivateUser(user.getUsername());
        return ResponseEntity.noContent().build();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{username}")
    public ResponseEntity<?> deactivateUserByUsername(@PathVariable String username) {
        userService.deactivateUser(username);
        return ResponseEntity.noContent().build();
    }
}
