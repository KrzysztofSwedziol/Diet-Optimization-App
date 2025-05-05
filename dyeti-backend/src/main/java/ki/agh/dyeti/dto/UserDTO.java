package ki.agh.dyeti.dto;

import ki.agh.dyeti.model.Role;
import ki.agh.dyeti.model.User;

public record UserDTO(Long id, String username, String email) {

  public static UserDTO fromUser(User user) {
    return new UserDTO(user.getId(), user.getUsername(), user.getEmail());
  }

  public static User toUser(UserDTO userDTO, Role role) {
    return User.builder().email(userDTO.email()).username(userDTO.username()).role(role).build();
  }
}
