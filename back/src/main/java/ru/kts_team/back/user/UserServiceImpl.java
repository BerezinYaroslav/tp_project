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
    public User addUser(User user) {
        log.info("Add a user");

        if (user.getSubscriptionLevel() == null) {
            user.setSubscriptionLevel(0);
        }

        return repository.save(user);
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
    public User updateUser(User user) {
        log.info("Update a user");
        return repository.save(user);
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
