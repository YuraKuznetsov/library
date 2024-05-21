package org.example.dto.user;

import lombok.Getter;
import lombok.Setter;
import org.example.security.Role;

@Getter
@Setter
public class UserResponseDTO {

    private String name;
    private String email;
    private Role role;
}
