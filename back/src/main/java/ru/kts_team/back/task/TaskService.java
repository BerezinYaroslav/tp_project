package ru.kts_team.back.task;

import java.util.List;

public interface TaskService {
    Task addTask(Task task);

    List<Task> getTasks(Long ownerId);

    List<Task> getTasksByListId(Long listId, Long ownerId);

    List<Task> getTasksByParentId(Long parentId, Long ownerId);

    List<Task> getTasksByIsDone(Boolean isDone, Long ownerId);

    List<Task> getTasksByParentIdIsNull(Long ownerId);

    Task getTaskById(Long id, Long ownerId);

    Task updateTask(Task task, Long ownerId);

    void deleteTasks();

    void deleteTaskById(Long id);
}
