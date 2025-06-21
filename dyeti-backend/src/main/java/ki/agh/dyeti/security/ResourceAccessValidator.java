package ki.agh.dyeti.security;

import ki.agh.dyeti.exception.AccessDeniedException;
import ki.agh.dyeti.model.User;
import ki.agh.dyeti.model.util.Ownable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ResourceAccessValidator {

    private final CurrentUserProvider currentUserProvider;

    ResourceAccessValidator(CurrentUserProvider currentUserProvider) {
        this.currentUserProvider = currentUserProvider;
    }

    public void validateOwnership(Ownable resource) {
        validateOwnership(resource, "You do not have permission to access this resource");
    }

    public void validateOwnership(Ownable resource, String message) {
        Optional<User> currentUser = currentUserProvider.getCurrentUser();

        if (
            resource.getOwner() == null
            || currentUser.isEmpty()
            || !resource.getOwner().getId().equals(currentUser.get().getId())
        ) {
            throw new AccessDeniedException(message);
        }
    }
}
