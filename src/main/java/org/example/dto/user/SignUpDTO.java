package org.example.dto.user;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Getter
@Setter
public class SignUpDTO {

    @NotBlank
    @Email
    private String email;
    private char[] password;
    @NotBlank
    @Size(min = 2, max = 30)
    private String name;
}
