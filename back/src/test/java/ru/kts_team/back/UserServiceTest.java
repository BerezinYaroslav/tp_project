package ru.kts_team.back;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import ru.kts_team.back.user.User;
import ru.kts_team.back.user.UserRepository;
import ru.kts_team.back.user.UserServiceImpl;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class UserServiceTest {
    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserServiceImpl userService;

    private User user;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        user = new User();
        user.setId(1L);
        user.setName("John Doe");
        user.setAge(30);
        user.setEmail("john.doe@example.com");
        user.setPassword("password123");
    }

    @Test
    void addUser_ShouldSaveUser() {
        when(userRepository.save(any(User.class))).thenReturn(user);

        User result = userService.addUser(user);

        assertNotNull(result);
        assertEquals(user.getName(), result.getName());
        verify(userRepository, times(1)).save(user);
    }

    @Test
    void getUsers_ShouldReturnAllUsers() {
        List<User> users = new ArrayList<>();
        users.add(user);
        when(userRepository.findAll()).thenReturn(users);

        List<User> result = userService.getUsers();

        assertEquals(1, result.size());
        assertEquals(user.getName(), result.get(0).getName());
        verify(userRepository, times(1)).findAll();
    }

    @Test
    void getUserById_ShouldReturnUser_WhenExists() {
        when(userRepository.findById(1L)).thenReturn(Optional.of(user));

        User result = userService.getUserById(1L);

        assertNotNull(result);
        assertEquals("John Doe", result.getName());
        verify(userRepository, times(1)).findById(1L);
    }

    @Test
    void getUserById_ShouldThrowException_WhenNotFound() {
        when(userRepository.findById(1L)).thenReturn(Optional.empty());

        Exception exception = assertThrows(RuntimeException.class, () -> {
            userService.getUserById(1L);
        });

        String expectedMessage = "There is no a user with id 1";
        String actualMessage = exception.getMessage();

        assertTrue(actualMessage.contains(expectedMessage));
        verify(userRepository, times(1)).findById(1L);
    }

    @Test
    void updateUser_ShouldReturnUpdatedUser() {
        when(userRepository.save(user)).thenReturn(user);

        User result = userService.updateUser(user);

        assertEquals(user.getName(), result.getName());
        verify(userRepository, times(1)).save(user);
    }

    @Test
    void deleteUserById_ShouldDeleteUser_WhenExists() {
        doNothing().when(userRepository).deleteById(1L);

        userService.deleteUserById(1L);

        verify(userRepository, times(1)).deleteById(1L);
    }

    @Test
    void deleteUsers_ShouldDeleteAllUsers() {
        doNothing().when(userRepository).deleteAll();

        userService.deleteUsers();

        verify(userRepository, times(1)).deleteAll();
    }
}
