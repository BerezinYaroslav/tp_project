package ru.kts_team.back;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import ru.kts_team.back.task.Task;
import ru.kts_team.back.task.TaskRepository;
import ru.kts_team.back.task.TaskServiceImpl;
import ru.kts_team.back.user.User;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class TaskServiceTest {
    @Mock
    private TaskRepository taskRepository;

    @InjectMocks
    private TaskServiceImpl taskService;

    private Task task;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        User user = new User();
        user.setId(1L);
        user.setName("user");
        user.setEmail("user@gmail.com");
        user.setPassword("user");

        task = new Task();
        task.setId(1L);
        task.setName("Test Task");
        task.setCreationDate(new Date());
        task.setIsDone(false);
        task.setOwner(user);
    }

    @Test
    void addTask_ShouldSetCreationDateAndIsDone_WhenNotProvided() {
        task.setCreationDate(null);
        task.setIsDone(null);

        when(taskRepository.save(any(Task.class))).thenReturn(task);

        Task result = taskService.addTask(task);

        assertNotNull(result.getCreationDate());
        assertFalse(result.getIsDone());
        verify(taskRepository, times(1)).save(task);
    }

    @Test
    void getTasks_ShouldReturnAllTasks() {
        List<Task> tasks = new ArrayList<>();
        tasks.add(task);
        when(taskRepository.findAllByOwner_Id(1L)).thenReturn(tasks);

        List<Task> result = taskService.getTasks(1L);

        assertEquals(1, result.size());
        assertEquals(task.getName(), result.get(0).getName());
        verify(taskRepository, times(1)).findAllByOwner_Id(1L);
    }

    @Test
    void getTaskById_ShouldReturnTask_WhenExists() {
        when(taskRepository.findByIdAndOwner_Id(1L, 1L)).thenReturn(Optional.of(task));

        Task result = taskService.getTaskById(1L, 1L);

        assertNotNull(result);
        assertEquals("Test Task", result.getName());
        verify(taskRepository, times(1)).findByIdAndOwner_Id(1L, 1L);
    }

    @Test
    void getTaskById_ShouldThrowException_WhenNotFound() {
        when(taskRepository.findByIdAndOwner_Id(1L, 1L)).thenReturn(Optional.empty());

        Exception exception = assertThrows(RuntimeException.class, () -> {
            taskService.getTaskById(1L, 1L);
        });

        String expectedMessage = "There is no a task with id 1";
        String actualMessage = exception.getMessage();

        assertTrue(actualMessage.contains(expectedMessage));
        verify(taskRepository, times(1)).findByIdAndOwner_Id(1L, 1L);
    }

    @Test
    void deleteTaskById_ShouldDeleteTask_WhenExists() {
        doNothing().when(taskRepository).deleteById(1L);

        taskService.deleteTaskById(1L);

        verify(taskRepository, times(1)).deleteById(1L);
    }

    @Test
    void updateTask_ShouldReturnUpdatedTask() {
        when(taskRepository.save(task)).thenReturn(task);

        Task result = taskService.updateTask(task, 1L);

        assertEquals(task.getName(), result.getName());
        verify(taskRepository, times(1)).save(task);
    }
}
