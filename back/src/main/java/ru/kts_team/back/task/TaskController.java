package ru.kts_team.back.task;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tasks")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class TaskController {
    private final TaskService service;

    @PostMapping
    public void addTask(@Valid @RequestBody Task task) {
        service.addTask(task);
    }

    @GetMapping
    public List<Task> getTasks() {
        return service.getTasks();
    }

    @GetMapping("/{id}")
    public Task getTaskById(@PathVariable Long id) {
        return service.getTaskById(id);
    }

    @PutMapping
    public void updateTask(@Valid @RequestBody Task task) {
        service.updateTask(task);
    }

    @DeleteMapping
    public void deleteTasks() {
        service.deleteTasks();
    }

    @DeleteMapping("/{id}")
    public void deleteTaskById(@PathVariable Long id) {
        service.deleteTaskById(id);
    }
}
