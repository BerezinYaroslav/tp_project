package ru.kts_team.back.task;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findAllByList_Id(Long listId);

    List<Task> findAllByParentId(Long parentId);

    List<Task> findAllByIsDone(Boolean isDone);

    List<Task> findAllByParentIdIsNull();
}
