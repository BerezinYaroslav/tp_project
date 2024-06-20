package ru.kts_team.back.user;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {
    private final UserService service;

    @PostMapping
    public void addUser(@Valid @RequestBody User user) {
        service.addUser(user);
    }

    @GetMapping
    public List<User> getUsers() {
        return service.getUsers();
    }

    @GetMapping("/{id}")
    public User getUserById(@PathVariable Long id) {
        return service.getUserById(id);
    }

    @PutMapping
    public void updateUser(@Valid @RequestBody User user) {
        service.updateUser(user);
    }

    @DeleteMapping
    public void deleteUsers() {
        service.deleteUsers();
    }

    @DeleteMapping("/{id}")
    public void deleteUserById(@PathVariable Long id) {
        service.deleteUserById(id);
    }
}
