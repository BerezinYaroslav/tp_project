package ru.kts_team.back;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import ru.kts_team.back.list.TaskList;
import ru.kts_team.back.list.TaskListRepository;
import ru.kts_team.back.list.TaskListServiceImpl;
import ru.kts_team.back.user.User;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class ListServiceTest {
    @Mock
    private TaskListRepository taskListRepository;

    @InjectMocks
    private TaskListServiceImpl taskListService;

    private TaskList taskList;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        taskList = new TaskList();
        taskList.setId(1L);
        taskList.setName("Work Tasks");

        User owner = new User();
        owner.setId(1L);
        owner.setName("John Doe");
        taskList.setOwner(owner);
    }

    @Test
    void addList_ShouldSaveTaskList() {
        when(taskListRepository.save(any(TaskList.class))).thenReturn(taskList);

        TaskList result = taskListService.addList(taskList);

        assertNotNull(result);
        assertEquals(taskList.getName(), result.getName());
        verify(taskListRepository, times(1)).save(taskList);
    }

    @Test
    void getLists_ShouldReturnAllTaskLists() {
        List<TaskList> taskLists = new ArrayList<>();
        taskLists.add(taskList);
        when(taskListRepository.findAllByOwner_Id(1L)).thenReturn(taskLists);

        List<TaskList> result = taskListService.getLists(1L);

        assertEquals(1, result.size());
        assertEquals(taskList.getName(), result.get(0).getName());
        verify(taskListRepository, times(1)).findAllByOwner_Id(1L);
    }

    @Test
    void getListById_ShouldReturnTaskList_WhenExists() {
        when(taskListRepository.findByIdAndOwner_Id(1L, 1L)).thenReturn(Optional.of(taskList));

        System.out.println(taskList);
        TaskList result = taskListService.getListById(1L, 1L);

        assertNotNull(result);
        assertEquals("Work Tasks", result.getName());
        verify(taskListRepository, times(1)).findByIdAndOwner_Id(1L, 1L);
    }

    @Test
    void getListById_ShouldThrowException_WhenNotFound() {
        when(taskListRepository.findById(1L)).thenReturn(Optional.empty());

        Exception exception = assertThrows(RuntimeException.class, () -> {
            taskListService.getListById(1L, 1L);
        });

        String expectedMessage = "There is no a list with id 1";
        String actualMessage = exception.getMessage();

        assertTrue(actualMessage.contains(expectedMessage));
        verify(taskListRepository, times(1)).findByIdAndOwner_Id(1L, 1L);
    }

    @Test
    void updateList_ShouldReturnUpdatedTaskList() {
        when(taskListRepository.save(taskList)).thenReturn(taskList);

        TaskList result = taskListService.updateList(taskList);

        assertEquals(taskList.getName(), result.getName());
        verify(taskListRepository, times(1)).save(taskList);
    }

    @Test
    void deleteListById_ShouldDeleteTaskList_WhenExists() {
        doNothing().when(taskListRepository).deleteById(1L);

        taskListService.deleteListById(1L);

        verify(taskListRepository, times(1)).deleteById(1L);
    }

    @Test
    void deleteLists_ShouldDeleteAllTaskLists() {
        doNothing().when(taskListRepository).deleteAll();

        taskListService.deleteLists();

        verify(taskListRepository, times(1)).deleteAll();
    }

    @Test
    void updateList_ShouldNotChangeId_WhenUpdated() {
        when(taskListRepository.save(taskList)).thenReturn(taskList);

        TaskList result = taskListService.updateList(taskList);

        assertEquals(1L, result.getId());  // Проверка, что ID не изменился
        verify(taskListRepository, times(1)).save(taskList);
    }

}
