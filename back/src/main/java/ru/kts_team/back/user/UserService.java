package ru.kts_team.back.user;

import java.util.List;

public interface UserService {
    User addUser(User user);

    List<User> getUsers();

    User getUserById(Long id);

    User updateUser(User user);

    void deleteUsers();

    void deleteUserById(Long id);
}
