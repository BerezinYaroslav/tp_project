package ru.kts_team.back.tag;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.hibernate.annotations.ColumnDefault;
import ru.kts_team.back.user.User;

@Data
@Entity
@Table(name = "tags")
@RequiredArgsConstructor
@Schema(name = "Tag", description = "Model for Tags")
public class TaskTag {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    @NotEmpty
    @Size(max = 50, min = 1)
    private String name;

    @Column(name = "color")
    @Size(max = 10)
    @ColumnDefault(value = "#ffffff")
    private String color;

    @ManyToOne
    @JoinColumn(name = "creator_id", referencedColumnName = "id")
    private User creator;
}
