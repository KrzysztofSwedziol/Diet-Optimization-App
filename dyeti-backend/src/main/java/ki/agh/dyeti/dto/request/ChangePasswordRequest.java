package ki.agh.dyeti.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record ChangePasswordRequest(
        @NotBlank String currentPassword, @NotBlank @Size(min = MIN_PASSWORD) String newPassword) {
    private static final int MIN_PASSWORD = 8;
}
