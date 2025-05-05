package ki.agh.dyeti.dto;

import ki.agh.dyeti.model.Role;
import ki.agh.dyeti.model.User;
import ki.agh.dyeti.model.util.Gender;
import lombok.Builder;

@Builder
public record UserDTO(
        Long id,
        String username,
        String email,
        Integer age,
        Gender gender,
        Integer height,
        Integer weight,
        Integer energyReq,
        Integer proteinReq,
        Integer carbsReq,
        Integer fatReq,
        Role role
) {
    public static UserDTO fromUser(User user) {
        return UserDTO.builder()
                .id(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .age(user.getAge())
                .gender(user.getGender())
                .height(user.getHeight())
                .weight(user.getWeight())
                .energyReq(user.getEnergyReq())
                .proteinReq(user.getProteinReq())
                .carbsReq(user.getCarbsReq())
                .fatReq(user.getFatReq())
                .role(user.getRole())
                .build();
    }
}