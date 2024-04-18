package ru.kts_team.back;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import lombok.Data;
import lombok.RequiredArgsConstructor;

/**
 * @author yaroslavberezin
 * @created 29/02/2024
 * @project tp_project
 */

@Data
@Entity
@Table(name = "tasks")
@RequiredArgsConstructor
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @Column(name = "name", unique = true)
    @NotEmpty
    String name;
}
