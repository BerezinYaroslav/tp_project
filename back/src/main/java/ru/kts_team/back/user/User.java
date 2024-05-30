package ru.kts_team.back.user;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@Entity
@Table(name = "users")
@RequiredArgsConstructor
public class User {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", unique = true)
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
    @Size(max = 50)
    @NotEmpty
    private String password;
}
