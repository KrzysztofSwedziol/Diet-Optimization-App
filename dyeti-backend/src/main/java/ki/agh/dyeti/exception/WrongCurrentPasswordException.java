package ki.agh.dyeti.exception;

public class WrongCurrentPasswordException extends RuntimeException {
    public WrongCurrentPasswordException() {
        super("Wrong current password");
    }
}
