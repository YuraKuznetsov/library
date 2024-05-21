package org.example.dto.user;

import org.example.model.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserMapper {

    @Mapping(target = "password", ignore = true)
    User signUpDTOToUser(SignUpDTO signUpDTO);

    UserResponseDTO userToUserResponseDTO(User user);
}
