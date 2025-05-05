package ki.agh.dyeti.controller;

import jakarta.validation.Valid;
import ki.agh.dyeti.dto.UserDTO;
import ki.agh.dyeti.dto.request.RegisterRequest;
import ki.agh.dyeti.service.CustomUserDetailsService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {
    private final CustomUserDetailsService customUserDetailsService;

    public AuthController(CustomUserDetailsService customUserDetailsService) {
        this.customUserDetailsService = customUserDetailsService;
    }

    @PostMapping("/register")
    public ResponseEntity<UserDTO> registerUser(@RequestBody @Valid RegisterRequest registerRequest) {
        return ResponseEntity.ok(customUserDetailsService.register(registerRequest));
    }
}
