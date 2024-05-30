package ru.kts_team.back.task;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.hibernate.annotations.ColumnDefault;
import org.springframework.format.annotation.DateTimeFormat;
import ru.kts_team.back.list.TaskList;
import ru.kts_team.back.tag.Tag;
import ru.kts_team.back.user.User;

import java.util.Date;
import java.util.List;

@Data
@Entity
@Table(name = "tasks")
@RequiredArgsConstructor
public class Task {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", unique = true)
    @NotEmpty
    @Size(max = 50, min = 1)
    private String name;

    @ManyToOne
    @JoinColumn(name = "owner_id", referencedColumnName = "id")
    private User owner;

    @Column(name = "creation_date")
    @Temporal(TemporalType.DATE)
    @DateTimeFormat(pattern = "dd.MM.yyyy")
    private Date creationDate;

    @Column(name = "finish_date")
    @Temporal(TemporalType.DATE)
    @DateTimeFormat(pattern = "dd.MM.yyyy")
    private Date finishDate;

    @Column(name = "is_done")
    @ColumnDefault(value = "false")
    private Boolean isDone;

    @ManyToOne
    @JoinColumn(name = "list_id", referencedColumnName = "id")
    private TaskList list;

    @Column(name = "parent_id")
    private Long parentId;

    @Column(name = "priority")
    private Integer priority;

    @ManyToMany
    @JoinTable(name = "tasks_tags",
            joinColumns = @JoinColumn(name = "task_id"),
            inverseJoinColumns = @JoinColumn(name = "tag_id"))
    private List<Tag> tags;
}
