package ru.kts_team.back.user;

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
@RequestMapping("/users")
@RequiredArgsConstructor
@Tag(name = "users", description = "Controller for Users")
@CrossOrigin("*")
public class UserController {
    private final UserService service;

    @PostMapping(produces = {"application/json"})
    @Operation(
            summary = "Creation User",
            description = "Creation User",
            tags = {"users"}
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Creation User",
                    content = {
                            @Content(
                                    mediaType = APPLICATION_JSON_VALUE,
                                    schema = @Schema(implementation = User.class)
                            )
                    })
    })
    public User addUser(@RequestBody @Valid User user) {
        return service.addUser(user);
    }

    @GetMapping(produces = {"application/json"})
    @Operation(
            summary = "Getting all Users",
            description = "Getting all Users",
            tags = {"users"}
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Getting all Users",
                    content = {
                            @Content(
                                    mediaType = APPLICATION_JSON_VALUE,
                                    array = @ArraySchema(schema = @Schema(implementation = User.class))
                            )
                    })
    })
    public List<User> getUsers() {
        return service.getUsers();
    }

    @GetMapping(value = "/{id}", produces = {"application/json"})
    @Operation(
            summary = "Getting User by ID",
            description = "Getting User by ID",
            tags = {"users"}
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Getting User by ID",
                    content = {
                            @Content(
                                    mediaType = APPLICATION_JSON_VALUE,
                                    schema = @Schema(implementation = User.class)
                            )
                    })
    })
    public User getUserById(@PathVariable Long id) {
        return service.getUserById(id);
    }

    @PutMapping(produces = {"application/json"})
    @Operation(
            summary = "Updating User",
            description = "Updating User",
            tags = {"users"}
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Updating User",
                    content = {
                            @Content(
                                    mediaType = APPLICATION_JSON_VALUE,
                                    schema = @Schema(implementation = User.class)
                            )
                    })
    })
    public User updateUser(@RequestBody @Valid User user) {
        return service.updateUser(user);
    }

    @DeleteMapping(produces = {"application/json"})
    @Operation(
            summary = "Deleting all Users",
            description = "Deleting all Users",
            tags = {"users"}
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Deleting all Users"
            )
    })
    public void deleteUsers() {
        service.deleteUsers();
    }

    @DeleteMapping(value = "/{id}", produces = {"application/json"})
    @Operation(
            summary = "Deleting User By ID",
            description = "Deleting User By ID",
            tags = {"users"}
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Deleting User By ID"
            )
    })
    public void deleteUserById(@PathVariable Long id) {
        service.deleteUserById(id);
    }
}
