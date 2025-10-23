package ki.agh.dyeti.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import ki.agh.dyeti.model.util.Gender;

public record UpdateProfileRequest(
        @NotBlank @Size(max = 50) String username,
        @NotBlank @Email @Size(max = 255) String email,
        @NotNull @Min(1) @Max(120) Integer age,
        @NotNull Gender gender,
        @NotNull @Min(50) @Max(250) Integer height,
        @NotNull @Min(20) @Max(250) Integer weight) {}
