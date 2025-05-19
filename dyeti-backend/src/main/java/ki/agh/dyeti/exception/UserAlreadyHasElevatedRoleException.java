package ki.agh.dyeti.exception;

public class UserAlreadyHasElevatedRoleException extends RuntimeException {
    public UserAlreadyHasElevatedRoleException(Long userId, String currentRole) {
        super("User with ID " + userId + " already has role " + currentRole);
    }
}
