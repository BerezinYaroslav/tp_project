package ru.kts_team.back.user;

import java.util.List;

public interface UserService {
    void addUser(User user);

    List<User> getUsers();

    User getUserById(Long id);

    void updateUser(User user);

    void deleteUsers();

    void deleteUserById(Long id);
}
