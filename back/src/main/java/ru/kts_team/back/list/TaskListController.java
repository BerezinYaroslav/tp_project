package ru.kts_team.back.list;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/lists")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class TaskListController {
    private final TaskListService service;

    @PostMapping
    public void addList(@Valid @RequestBody TaskList taskList) {
        service.addList(taskList);
    }

    @GetMapping
    public List<TaskList> getLists() {
        return service.getLists();
    }

    @GetMapping("/{id}")
    public TaskList getListById(@PathVariable Long id) {
        return service.getListById(id);
    }

    @PutMapping
    public void updateList(@Valid @RequestBody TaskList taskList) {
        service.updateList(taskList);
    }

    @DeleteMapping
    public void deleteLists() {
        service.deleteLists();
    }

    @DeleteMapping("/{id}")
    public void deleteListById(@PathVariable Long id) {
        service.deleteListById(id);
    }
}
