package ru.kts_team.back.task;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class TaskServiceImpl implements TaskService {
    private final TaskRepository repository;

    @Override
    public Task addTask(Task task) {
        log.info("Add a task");

        if (task.getCreationDate() == null) {
            task.setCreationDate(Date.from(Instant.now()));
        }
        if (task.getIsDone() == null) {
            task.setIsDone(false);
        }

        return repository.save(task);
    }

    @Override
    public List<Task> getTasks() {
        log.info("Get tasks");
        return repository.findAll();
    }

    @Override
    public Task getTaskById(Long id) {
        log.info("Get a task by id");
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("There is no a task with id " + id));
    }

    @Override
    public Task updateTask(Task task) {
        log.info("Update a task");
        return repository.save(task);
    }

    @Override
    public void deleteTasks() {
        log.info("Delete tasks");
        repository.deleteAll();
    }

    @Override
    public void deleteTaskById(Long id) {
        log.info("Delete a task with id " + id);
        repository.deleteById(id);
    }
}
