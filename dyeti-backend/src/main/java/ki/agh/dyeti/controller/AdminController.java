package ki.agh.dyeti.controller;

import java.util.List;
import ki.agh.dyeti.dto.UserDTO;
import ki.agh.dyeti.service.CustomUserDetailsService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/admin")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {
    private final CustomUserDetailsService userService;

    public AdminController(CustomUserDetailsService userService) {
        this.userService = userService;
    }

    @GetMapping("/admins")
    @PreAuthorize("hasAnyRole('ADMIN','OWNER')")
    public List<UserDTO> getAllAdmins() {
        return userService.getAllAdmins();
    }

    @GetMapping("/users")
    @PreAuthorize("hasAnyRole('ADMIN','OWNER')")
    public List<UserDTO> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/all")
    @PreAuthorize("hasAnyRole('ADMIN','OWNER')")
    public List<UserDTO> getAll() {
        return userService.getAll();
    }

    @PatchMapping("/grant")
    @PreAuthorize("hasRole('OWNER')")
    public UserDTO grantAdminAuthority(@RequestParam("userId") Long userId) {
        return userService.grantAdminRole(userId);
    }

    @PatchMapping("/revoke")
    @PreAuthorize("hasRole('OWNER')")
    public UserDTO revokeAdminAuthority(@RequestParam("userId") Long userId) {
        return userService.revokeAdminRole(userId);
    }
}
