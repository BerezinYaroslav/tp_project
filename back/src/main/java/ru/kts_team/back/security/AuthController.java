package ru.kts_team.back.security;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import ru.kts_team.back.user.User;
import ru.kts_team.back.user.UserRepository;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin("*")
public class AuthController {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody User user) {
        if (userRepository.existsByEmail(user.getEmail())) {
            return new ResponseEntity<>("Email is already taken!", HttpStatus.BAD_REQUEST);
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        User savedUser = userRepository.save(user);

        return new ResponseEntity<>(String.valueOf(savedUser.getId()), HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity<String> loginUser() {
        return new ResponseEntity<>("User logged in successfully", HttpStatus.OK);
    }
}
