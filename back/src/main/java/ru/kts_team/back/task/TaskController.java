package ru.kts_team.back.task;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@RestController
@RequestMapping("/tasks")
@RequiredArgsConstructor
@Tag(name = "tasks", description = "Controller for Tasks")
@CrossOrigin("*")
public class TaskController {
    private final TaskService service;

    @PostMapping(produces = {"application/json"})
    @Operation(
            summary = "Creation Task",
            description = "Creation Task",
            tags = {"tasks"}
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Creation Task",
                    content = {
                            @Content(
                                    mediaType = APPLICATION_JSON_VALUE,
                                    schema = @Schema(implementation = Task.class)
                            )
                    })
    })
    public Task addTask(@RequestBody @Valid Task task) {
        return service.addTask(task);
    }

    @GetMapping(produces = {"application/json"})
    @Operation(
            summary = "Getting all Tasks",
            description = "Getting all Tasks",
            tags = {"tasks"}
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Getting all Tasks",
                    content = {
                            @Content(
                                    mediaType = APPLICATION_JSON_VALUE,
                                    array = @ArraySchema(schema = @Schema(implementation = Task.class))
                            )
                    })
    })
    public List<Task> getTasks() {
        return service.getTasks();
    }

    @GetMapping(value = "/list", produces = {"application/json"})
    @Operation(
            summary = "Getting all Tasks by List ID",
            description = "Getting all Tasks by List ID",
            tags = {"tasks"}
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Getting all Tasks by List ID",
                    content = {
                            @Content(
                                    mediaType = APPLICATION_JSON_VALUE,
                                    array = @ArraySchema(schema = @Schema(implementation = Task.class))
                            )
                    })
    })
    public List<Task> getTasksByListId(@RequestParam Long listId) {
        return service.getTasksByListId(listId);
    }

    @GetMapping(value = "/parent", produces = {"application/json"})
    @Operation(
            summary = "Getting all Tasks by Parent ID",
            description = "Getting all Tasks by Parent ID",
            tags = {"tasks"}
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Getting all Tasks by Parent ID",
                    content = {
                            @Content(
                                    mediaType = APPLICATION_JSON_VALUE,
                                    array = @ArraySchema(schema = @Schema(implementation = Task.class))
                            )
                    })
    })
    public List<Task> getTasksByParentId(@RequestParam Long parentId) {
        return service.getTasksByParentId(parentId);
    }

    @GetMapping(value = "/isDone", produces = {"application/json"})
    @Operation(
            summary = "Getting all Tasks by Is Done",
            description = "Getting all Tasks by Is Done",
            tags = {"tasks"}
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Getting all Tasks by Is Done",
                    content = {
                            @Content(
                                    mediaType = APPLICATION_JSON_VALUE,
                                    array = @ArraySchema(schema = @Schema(implementation = Task.class))
                            )
                    })
    })
    public List<Task> getTasksByIsDone(@RequestParam Boolean isDone) {
        return service.getTasksByIsDone(isDone);
    }

    @GetMapping(value = "/parentIdIsNull", produces = {"application/json"})
    @Operation(
            summary = "Getting all Tasks by Parent ID is null",
            description = "Getting all Tasks by Parent ID is null",
            tags = {"tasks"}
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Getting all Tasks by Parent ID is null",
                    content = {
                            @Content(
                                    mediaType = APPLICATION_JSON_VALUE,
                                    array = @ArraySchema(schema = @Schema(implementation = Task.class))
                            )
                    })
    })
    public List<Task> getTasksByParentIdIsNull() {
        return service.getTasksByParentIdIsNull();
    }

    @GetMapping(value = "/{id}", produces = {"application/json"})
    @Operation(
            summary = "Getting Task by ID",
            description = "Getting Task by ID",
            tags = {"tasks"}
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Getting Task by ID",
                    content = {
                            @Content(
                                    mediaType = APPLICATION_JSON_VALUE,
                                    schema = @Schema(implementation = Task.class)
                            )
                    })
    })
    public Task getTaskById(@PathVariable Long id) {
        return service.getTaskById(id);
    }

    @PutMapping(produces = {"application/json"})
    @Operation(
            summary = "Updating Task",
            description = "Updating Task",
            tags = {"tasks"}
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Updating Task",
                    content = {
                            @Content(
                                    mediaType = APPLICATION_JSON_VALUE,
                                    schema = @Schema(implementation = Task.class)
                            )
                    })
    })
    public Task updateTask(@RequestBody @Valid Task task) {
        return service.updateTask(task);
    }

    @DeleteMapping(produces = {"application/json"})
    @Operation(
            summary = "Deleting all Tasks",
            description = "Deleting all Tasks",
            tags = {"tasks"}
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Deleting all Tasks"
            )
    })
    public void deleteTasks() {
        service.deleteTasks();
    }

    @DeleteMapping(value = "/{id}", produces = {"application/json"})
    @Operation(
            summary = "Deleting Task By ID",
            description = "Deleting Task By ID",
            tags = {"tasks"}
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Deleting Task By ID"
            )
    })
    public void deleteTaskById(@PathVariable Long id) {
        service.deleteTaskById(id);
    }
}
