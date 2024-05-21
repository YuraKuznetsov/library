package org.example.controller;

import lombok.RequiredArgsConstructor;
import org.example.dto.user.AuthResponse;
import org.example.dto.user.LogInDTO;
import org.example.dto.user.SignUpDTO;
import org.example.service.UserService;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    private final UserService userService;

    @PostMapping("/log-in")
    public AuthResponse logIn(@Valid @RequestBody LogInDTO logInDTO) {
        return userService.logIn(logInDTO);
    }

    @PostMapping("/sign-up")
    public AuthResponse signUp(@Valid @RequestBody SignUpDTO signUpDTO) {
        return userService.signUp(signUpDTO);
    }
}
