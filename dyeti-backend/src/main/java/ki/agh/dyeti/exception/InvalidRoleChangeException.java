package ki.agh.dyeti.exception;

public class InvalidRoleChangeException extends RuntimeException {
    public InvalidRoleChangeException(Long userId, String actualRole, String expectedRole) {
        super("Invalid role change for user with ID " + userId + " user has Role " + actualRole + " but expected Role "
                + expectedRole);
    }
}
