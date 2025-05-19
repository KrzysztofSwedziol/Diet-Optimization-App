package ki.agh.dyeti.service;

import jakarta.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;
import ki.agh.dyeti.dto.UserDTO;
import ki.agh.dyeti.dto.request.RegisterRequest;
import ki.agh.dyeti.exception.UserAlreadyHasElevatedRoleException;
import ki.agh.dyeti.model.Role;
import ki.agh.dyeti.model.User;
import ki.agh.dyeti.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public CustomUserDetailsService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository
                .findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + username));
    }

    public User getUserByUsername(String username) {
        return (User) loadUserByUsername(username);
    }

    @Transactional
    public UserDTO register(RegisterRequest request) {
        if (userRepository.findByUsername(request.getUsername()).isPresent()) {
            throw new UsernameNotFoundException("Username already exists");
        }
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new UsernameNotFoundException("Email already exists");
        }
        User user = User.builder()
                .username(request.getUsername())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.USER)
                .build();
        userRepository.save(user);
        return UserDTO.fromUser(user);
    }

    public List<UserDTO> getAllAdmins() {
        return userRepository.findAllByRole(Role.ADMIN).stream()
                .map(UserDTO::fromUser)
                .collect(Collectors.toList());
    }

    @Transactional
    public UserDTO grantAdminRole(Long userId) {
        User user = userRepository
                .findById(userId)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with id: " + userId));
        if (user.getRole() != Role.USER) {
            throw new UserAlreadyHasElevatedRoleException(userId, user.getRole().name());
        }
        user.setRole(Role.ADMIN);
        userRepository.save(user);
        return UserDTO.fromUser(user);
    }
}
