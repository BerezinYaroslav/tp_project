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
    public List<Task> getTasks(Long ownerId) {
        log.info("Get tasks");
        return repository.findAllByOwner_Id(ownerId);
    }

    @Override
    public List<Task> getTasksByListId(Long listId, Long ownerId) {
        log.info("Get tasks where list id = {}", listId);
        return repository.findAllByList_IdAndOwner_Id(listId, ownerId);
    }

    @Override
    public List<Task> getTasksByParentId(Long parentId, Long ownerId) {
        log.info("Get tasks where parent id = {}", parentId);
        return repository.findAllByParentIdAndOwner_Id(parentId, ownerId);
    }

    @Override
    public List<Task> getTasksByIsDone(Boolean isDone, Long ownerId) {
        log.info("Get tasks where is done = {}", isDone);
        return repository.findAllByIsDoneAndOwner_Id(isDone, ownerId);
    }

    @Override
    public List<Task> getTasksByParentIdIsNull(Long ownerId) {
        log.info("Get tasks where parent id is null");
        return repository.findAllByParentIdIsNullAndOwner_Id(ownerId);
    }

    @Override
    public Task getTaskById(Long id, Long ownerId) {
        log.info("Get a task by id");
        return repository.findByIdAndOwner_Id(id, ownerId)
                .orElseThrow(() -> new RuntimeException("There is no a task with id " + id));
    }

    @Override
    public Task updateTask(Task task, Long ownerId) {
        log.info("Update a task");
        Task updatedTask = repository.save(task);

        if (task.getParentId() != null) {
            Task parentTask = getTaskById(task.getParentId(), ownerId);
            List<Task> subtasks = getTasksByParentId(parentTask.getId(), ownerId);
            log.info(subtasks.toString());

            if ((!subtasks.isEmpty()) && (subtasks.stream().allMatch(Task::getIsDone))) {
                parentTask.setIsDone(true);
                updateTask(parentTask, ownerId);
            }
        }

        return updatedTask;
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
