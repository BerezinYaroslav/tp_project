package ru.kts_team.back.task;

import java.util.List;

public interface TaskService {
    Task addTask(Task task);

    List<Task> getTasks();

    Task getTaskById(Long id);

    Task updateTask(Task task);

    void deleteTasks();

    void deleteTaskById(Long id);
}
