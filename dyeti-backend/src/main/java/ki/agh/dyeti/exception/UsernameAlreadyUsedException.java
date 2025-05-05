package ki.agh.dyeti.exception;

public class UsernameAlreadyUsedException extends RuntimeException {
  public UsernameAlreadyUsedException(String username) {
    super("Username already in use: " + username);
  }
}
