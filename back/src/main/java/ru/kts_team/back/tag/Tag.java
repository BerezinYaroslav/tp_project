package ru.kts_team.back.tag;

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
public class Tag {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", unique = true)
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

//    @ManyToMany(mappedBy = "tags")
//    private List<Task> tasks;
}
