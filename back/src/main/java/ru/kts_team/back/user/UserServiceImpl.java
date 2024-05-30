package ru.kts_team.back.user;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserServiceImpl implements UserService {
    private final UserRepository repository;

    @Override
    public void addUser(User user) {
        log.info("Add a user");
        repository.save(user);
    }

    @Override
    public List<User> getUsers() {
        log.info("Get users");
        return repository.findAll();
    }

    @Override
    public User getUserById(Long id) {
        log.info("Get a user by id");
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("There is no a user with id " + id));
    }

    @Override
    public void updateUser(User user) {
        log.info("Update a user");
        repository.save(user);
    }

    @Override
    public void deleteUsers() {
        log.info("Delete users");
        repository.deleteAll();
    }

    @Override
    public void deleteUserById(Long id) {
        log.info("Delete a user with id " + id);
        repository.deleteById(id);
    }
}
