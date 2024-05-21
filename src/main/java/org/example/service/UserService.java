package org.example.service;

import lombok.RequiredArgsConstructor;
import org.example.dto.user.*;
import org.example.model.User;
import org.example.repository.UserRepository;
import org.example.security.JwtService;
import org.example.security.MyUserPrincipal;
import org.example.security.Role;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.nio.CharBuffer;
import java.util.Arrays;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthResponse logIn(LogInDTO logInDTO) {
        User user = userRepository.findUserByEmail(logInDTO.getEmail())
                .orElseThrow(NoSuchElementException::new);

        checkPasswords(logInDTO, user);
        clearPassword(logInDTO.getPassword());

        UserResponseDTO userDTO = userMapper.userToUserResponseDTO(user);
        String token = jwtService.generateToken(new MyUserPrincipal(user));

        return new AuthResponse(userDTO, token);
    }

    private void checkPasswords(LogInDTO logInDTO, User user) {
        if (!passwordEncoder.matches(CharBuffer.wrap(logInDTO.getPassword()), user.getPassword()))
            throw new RuntimeException();
    }

    public AuthResponse signUp(SignUpDTO signUpDTO) {
        if (!isAvailableEmail(signUpDTO.getEmail())) throw new RuntimeException();

        User user = userMapper.signUpDTOToUser(signUpDTO);
        user.setRole(Role.ROLE_USER);
        user.setPassword(passwordEncoder.encode(CharBuffer.wrap(signUpDTO.getPassword())));
        clearPassword(signUpDTO.getPassword());
        User savedUser = userRepository.save(user);

        UserResponseDTO userDTO = userMapper.userToUserResponseDTO(savedUser);
        String token = jwtService.generateToken(new MyUserPrincipal(savedUser));

        return new AuthResponse(userDTO, token);
    }

    private boolean isAvailableEmail(String email) {
        return userRepository.findUserByEmail(email).isEmpty();
    }

    private void clearPassword(char[] password) {
        Arrays.fill(password, '\0');
    }

    public User getCurrentUser() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();

        return userRepository.findUserByEmail(email)
                .orElseThrow(NoSuchElementException::new);
    }
}
