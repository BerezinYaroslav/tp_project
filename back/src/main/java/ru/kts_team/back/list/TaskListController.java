package ru.kts_team.back.list;

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
import java.util.stream.Collectors;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@RestController
@RequestMapping("/lists")
@RequiredArgsConstructor
@Tag(name = "lists", description = "Controller for Task Lists")
@CrossOrigin("*")
public class TaskListController {
    private final TaskListService service;

    @PostMapping(produces = {"application/json"})
    @Operation(
            summary = "Creation Task List",
            description = "Creation Task List",
            tags = {"lists"}
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Creation Task List",
                    content = {
                            @Content(
                                    mediaType = APPLICATION_JSON_VALUE,
                                    schema = @Schema(implementation = TaskList.class)
                            )
                    })
    })
    public TaskList addList(@RequestBody @Valid TaskList taskList) {
        return service.addList(taskList);
    }

    @GetMapping(produces = {"application/json"})
    @Operation(
            summary = "Getting all Task Lists",
            description = "Getting all Task Lists",
            tags = {"lists"}
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Getting all Task Lists",
                    content = {
                            @Content(
                                    mediaType = APPLICATION_JSON_VALUE,
                                    array = @ArraySchema(schema = @Schema(implementation = TaskList.class))
                            )
                    })
    })
    public List<TaskList> getLists(@RequestParam Long ownerId) {
        return service.getLists().stream()
                .filter(list -> list.getOwner() != null)
                .filter(list -> list.getOwner().getId().equals(ownerId))
                .collect(Collectors.toList());
    }

    @GetMapping(value = "/{id}", produces = {"application/json"})
    @Operation(
            summary = "Getting Task List by ID",
            description = "Getting Task List by ID",
            tags = {"lists"}
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Getting Task List by ID",
                    content = {
                            @Content(
                                    mediaType = APPLICATION_JSON_VALUE,
                                    schema = @Schema(implementation = TaskList.class)
                            )
                    })
    })
    public TaskList getListById(@PathVariable Long id, @RequestParam Long ownerId) {
        TaskList list = service.getListById(id);

        if ((list.getOwner() != null) && (list.getOwner().getId().equals(ownerId))) {
            return list;
        } else {
            throw new RuntimeException("It's not your list!");
        }
    }

    @PutMapping(produces = {"application/json"})
    @Operation(
            summary = "Updating Task List",
            description = "Updating Task List",
            tags = {"lists"}
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Updating Task List",
                    content = {
                            @Content(
                                    mediaType = APPLICATION_JSON_VALUE,
                                    schema = @Schema(implementation = TaskList.class)
                            )
                    })
    })
    public TaskList updateList(@RequestBody @Valid TaskList taskList) {
        return service.updateList(taskList);
    }

    @DeleteMapping(produces = {"application/json"})
    @Operation(
            summary = "Deleting all Task Lists",
            description = "Deleting all Task Lists",
            tags = {"lists"}
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Deleting all Task Lists"
            )
    })
    public void deleteLists() {
        service.deleteLists();
    }

    @DeleteMapping(value = "/{id}", produces = {"application/json"})
    @Operation(
            summary = "Deleting Task List By ID",
            description = "Deleting Task List By ID",
            tags = {"lists"}
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Deleting Task List By ID"
            )
    })
    public void deleteListById(@PathVariable Long id) {
        service.deleteListById(id);
    }
}
