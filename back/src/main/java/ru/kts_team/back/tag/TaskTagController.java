package ru.kts_team.back.tag;

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
@RequestMapping("/tags")
@RequiredArgsConstructor
@Tag(name = "tags", description = "Controller for Task Tags")
@CrossOrigin(origins = "http://localhost:5173")
public class TaskTagController {
    private final TaskTagService service;

    @PostMapping(produces = {"application/json"})
    @Operation(
            summary = "Creation Task Tag",
            description = "Creation Task Tag",
            tags = {"tags"}
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Creation Task Tag",
                    content = {
                            @Content(
                                    mediaType = APPLICATION_JSON_VALUE,
                                    schema = @Schema(implementation = TaskTag.class)
                            )
                    })
    })
    public TaskTag addTag(@RequestBody @Valid TaskTag taskTag) {
        return service.addTag(taskTag);
    }

    @GetMapping(produces = {"application/json"})
    @Operation(
            summary = "Getting all Task Tags",
            description = "Getting all Task Tags",
            tags = {"tags"}
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Getting all Task Tags",
                    content = {
                            @Content(
                                    mediaType = APPLICATION_JSON_VALUE,
                                    array = @ArraySchema(schema = @Schema(implementation = TaskTag.class))
                            )
                    })
    })
    public List<TaskTag> getTags() {
        return service.getTags();
    }

    @GetMapping(value = "/{id}", produces = {"application/json"})
    @Operation(
            summary = "Getting Task Tag by ID",
            description = "Getting Task Tag by ID",
            tags = {"tags"}
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Getting Task Tag by ID",
                    content = {
                            @Content(
                                    mediaType = APPLICATION_JSON_VALUE,
                                    schema = @Schema(implementation = TaskTag.class)
                            )
                    })
    })
    public TaskTag getTagById(@PathVariable Long id) {
        return service.getTagById(id);
    }

    @PutMapping(produces = {"application/json"})
    @Operation(
            summary = "Updating Task Tag",
            description = "Updating Task Tag",
            tags = {"tags"}
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Updating Task Tag",
                    content = {
                            @Content(
                                    mediaType = APPLICATION_JSON_VALUE,
                                    schema = @Schema(implementation = TaskTag.class)
                            )
                    })
    })
    public TaskTag updateTag(@RequestBody @Valid TaskTag taskTag) {
        return service.updateTag(taskTag);
    }

    @DeleteMapping(produces = {"application/json"})
    @Operation(
            summary = "Deleting all Task Tags",
            description = "Deleting all Task Tags",
            tags = {"tags"}
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Deleting all Task Tags"
            )
    })
    public void deleteTags() {
        service.deleteTags();
    }

    @DeleteMapping(value = "/{id}", produces = {"application/json"})
    @Operation(
            summary = "Deleting Task Tag By ID",
            description = "Deleting Task Tag By ID",
            tags = {"tags"}
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Deleting Task Tag By ID"
            )
    })
    public void deleteTagById(@PathVariable Long id) {
        service.deleteTagById(id);
    }
}
