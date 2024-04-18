package ru.kts_team.back;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @author yaroslavberezin
 * @created 29/02/2024
 * @project tp_project
 */

@RestController
@RequestMapping("/tasks")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:63342")
public class TaskController {
    private final TaskRepository taskRepository;

    @GetMapping
    public List<Task> getTask() {
        return taskRepository.findAll();
    }

    @PostMapping
    public void addTask(@Valid @RequestBody Task task) {
        taskRepository.save(task);
    }

    @DeleteMapping
    public void deleteTask() {
        taskRepository.deleteAll();
    }
}
