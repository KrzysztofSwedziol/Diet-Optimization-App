package ki.agh.dyeti.exception;

import java.util.HashMap;
import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public final class GlobalExceptionHandler {
    @ExceptionHandler(UsernameNotFoundException.class)
    public ResponseEntity<?> handleUsernameNotFound(UsernameNotFoundException ex) {
        return errorResponse("username", ex.getMessage(), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(EmailAlreadyUsedException.class)
    public ResponseEntity<?> handleEmailAlreadyUsed(EmailAlreadyUsedException ex) {
        return errorResponse("email", ex.getMessage(), HttpStatus.CONFLICT);
    }

    @ExceptionHandler(UsernameAlreadyUsedException.class)
    public ResponseEntity<?> handleUsernameAlreadyUsed(UsernameAlreadyUsedException ex) {
        return errorResponse("username", ex.getMessage(), HttpStatus.CONFLICT);
    }

    private ResponseEntity<?> errorResponse(String field, String message, HttpStatus status) {
        Map<String, String> error = new HashMap<>();
        error.put("errorField", field);
        error.put("errorMessage", message);
        return ResponseEntity.status(status).body(error);
    }

    @ExceptionHandler(UserAlreadyHasElevatedRoleException.class)
    public ResponseEntity<?> handleElevatedRole(UserAlreadyHasElevatedRoleException ex) {
        return errorResponse("role", ex.getMessage(), HttpStatus.CONFLICT);
    }
}
