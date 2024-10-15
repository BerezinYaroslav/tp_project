package ru.kts_team.back.user;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@Entity
@Table(name = "users")
@RequiredArgsConstructor
@Schema(name = "User", description = "Model for Users")
public class User {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    @NotEmpty
    @Size(max = 50, min = 1)
    private String name;

    @Column(name = "age")
    @Min(1)
    @Max(150)
    private Integer age;

    @Column(name = "email", unique = true)
    @Email
    @Size(max = 50)
    @NotEmpty
    private String email;

    @Column(name = "password")
    @NotEmpty
    private String password;
}
