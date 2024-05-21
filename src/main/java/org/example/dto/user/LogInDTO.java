package org.example.dto.user;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

@Getter
@Setter
public class LogInDTO {

    @NotBlank
    @Email
    private String email;
    private char[] password;
}
