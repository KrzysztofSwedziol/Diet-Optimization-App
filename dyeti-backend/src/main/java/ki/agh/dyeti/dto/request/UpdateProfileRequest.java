package ki.agh.dyeti.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import ki.agh.dyeti.model.util.Gender;

public record UpdateProfileRequest(
        @NotBlank @Size(max = USERNAME_MAX) String username,
        @NotBlank @Email @Size(max = EMAIL_MAX) String email,
        @NotNull @Min(AGE_MIN) @Max(AGE_MAX) Integer age,
        @NotNull Gender gender,
        @NotNull @Min(HEIGHT_MIN) @Max(HEIGHT_MAX) Integer height,
        @NotNull @Min(WEIGHT_MIN) @Max(WEIGHT_MAX) Integer weight) {
    // ints for @Size, longs for @Min/@Max
    public static final int USERNAME_MAX = 50;
    public static final int EMAIL_MAX = 255;

    public static final long AGE_MIN = 1L;
    public static final long AGE_MAX = 120L;
    public static final long HEIGHT_MIN = 50L;
    public static final long HEIGHT_MAX = 250L;
    public static final long WEIGHT_MIN = 20L;
    public static final long WEIGHT_MAX = 250L;
}
