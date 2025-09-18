package ki.agh.dyeti.mapper;

import ki.agh.dyeti.dto.UserDTO;
import ki.agh.dyeti.model.User;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface UserMapper {

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateUserFromDto(UserDTO dto, @MappingTarget User entity);

    UserDTO toDto(User user);
}
