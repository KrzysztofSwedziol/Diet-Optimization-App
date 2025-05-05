package ki.agh.dyeti.exception;

public class EmailAlreadyUsedException extends RuntimeException {
    public EmailAlreadyUsedException(String email) {
        super("Email already in use: " + email);
    }
}
