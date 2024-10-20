package ru.kts_team.back.security;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import ru.kts_team.back.task.Task;
import ru.kts_team.back.task.TaskRepository;
import ru.kts_team.back.user.User;
import ru.kts_team.back.user.UserRepository;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin("*")
public class AuthController {
    private final UserRepository userRepository;
    private final TaskRepository taskRepository;
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
    public ResponseEntity<String> loginUser(@RequestBody User requestUser) {
        User user = userRepository.findByEmail(requestUser.getEmail())
                .orElse(null);

        if (user == null) {
            return new ResponseEntity<>("User does not exist!", HttpStatus.UNAUTHORIZED);
        }

        if (!passwordEncoder.matches(requestUser.getPassword(), user.getPassword())) {
            return new ResponseEntity<>("Invalid password!", HttpStatus.UNAUTHORIZED);
        }

        return new ResponseEntity<>(String.valueOf(user.getId()), HttpStatus.OK);
    }

    @PostMapping("/restore")
    public ResponseEntity<String> restorePassword(@RequestBody User requestUser, @RequestParam String taskName) {
        User user = userRepository.findByEmail(requestUser.getEmail())
                .orElse(null);

        if (user == null) {
            return new ResponseEntity<>("User does not exist!", HttpStatus.UNAUTHORIZED);
        }

        Task task = taskRepository.findAllByOwner_IdOrderByIdDesc(user.getId()).stream()
                .findFirst()
                .orElse(null);

        if (task == null || !task.getName().equals(taskName)) {
            return new ResponseEntity<>("Task name does not match!", HttpStatus.UNAUTHORIZED);
        }

        user.setPassword(passwordEncoder.encode(requestUser.getPassword()));
        User savedUser = userRepository.save(user);

        return new ResponseEntity<>(String.valueOf(savedUser.getId()), HttpStatus.OK);
    }
}
