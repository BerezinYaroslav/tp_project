package ru.kts_team.back;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import ru.kts_team.back.tag.TaskTag;
import ru.kts_team.back.tag.TaskTagRepository;
import ru.kts_team.back.tag.TaskTagServiceImpl;
import ru.kts_team.back.user.User;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class TagServiceTest {
    @Mock
    private TaskTagRepository taskTagRepository;

    @InjectMocks
    private TaskTagServiceImpl taskTagService;

    private TaskTag taskTag;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        taskTag = new TaskTag();
        taskTag.setId(1L);
        taskTag.setName("Urgent");
        taskTag.setColor("#ff0000");

        User creator = new User();
        creator.setId(1L);
        creator.setName("Jane Doe");
        taskTag.setCreator(creator);
    }

    @Test
    void addTag_ShouldSaveTaskTag_WhenColorIsProvided() {
        when(taskTagRepository.save(any(TaskTag.class))).thenReturn(taskTag);

        TaskTag result = taskTagService.addTag(taskTag);

        assertNotNull(result);
        assertEquals(taskTag.getName(), result.getName());
        assertEquals("#ff0000", result.getColor());
        verify(taskTagRepository, times(1)).save(taskTag);
    }

    @Test
    void addTag_ShouldSetDefaultColor_WhenColorIsNull() {
        taskTag.setColor(null);

        when(taskTagRepository.save(any(TaskTag.class))).thenReturn(taskTag);

        TaskTag result = taskTagService.addTag(taskTag);

        assertNotNull(result.getColor());
        assertEquals("#ffffff", result.getColor());
        verify(taskTagRepository, times(1)).save(taskTag);
    }

    @Test
    void getTags_ShouldReturnAllTags() {
        List<TaskTag> tags = new ArrayList<>();
        tags.add(taskTag);
        when(taskTagRepository.findAll()).thenReturn(tags);

        List<TaskTag> result = taskTagService.getTags();

        assertEquals(1, result.size());
        assertEquals(taskTag.getName(), result.get(0).getName());
        verify(taskTagRepository, times(1)).findAll();
    }

    @Test
    void getTagById_ShouldReturnTaskTag_WhenExists() {
        when(taskTagRepository.findById(1L)).thenReturn(Optional.of(taskTag));

        TaskTag result = taskTagService.getTagById(1L);

        assertNotNull(result);
        assertEquals("Urgent", result.getName());
        verify(taskTagRepository, times(1)).findById(1L);
    }

    @Test
    void getTagById_ShouldThrowException_WhenNotFound() {
        when(taskTagRepository.findById(1L)).thenReturn(Optional.empty());

        Exception exception = assertThrows(RuntimeException.class, () -> {
            taskTagService.getTagById(1L);
        });

        String expectedMessage = "There is no a tag with id 1";
        String actualMessage = exception.getMessage();

        assertTrue(actualMessage.contains(expectedMessage));
        verify(taskTagRepository, times(1)).findById(1L);
    }

    @Test
    void updateTag_ShouldReturnUpdatedTaskTag() {
        when(taskTagRepository.save(taskTag)).thenReturn(taskTag);

        TaskTag result = taskTagService.updateTag(taskTag);

        assertEquals(taskTag.getName(), result.getName());
        verify(taskTagRepository, times(1)).save(taskTag);
    }

    @Test
    void deleteTagById_ShouldDeleteTaskTag_WhenExists() {
        doNothing().when(taskTagRepository).deleteById(1L);

        taskTagService.deleteTagById(1L);

        verify(taskTagRepository, times(1)).deleteById(1L);
    }

    @Test
    void deleteTags_ShouldDeleteAllTaskTags() {
        doNothing().when(taskTagRepository).deleteAll();

        taskTagService.deleteTags();

        verify(taskTagRepository, times(1)).deleteAll();
    }
}
