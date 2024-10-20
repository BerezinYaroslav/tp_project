package ru.kts_team.back.task;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findAllByOwner_Id(Long ownerId);

    List<Task> findAllByOwner_IdOrderByIdDesc(Long ownerId);

    Optional<Task> findByIdAndOwner_Id(Long taskId, Long ownerId);

    List<Task> findAllByList_IdAndOwner_Id(Long listId, Long ownerId);

    List<Task> findAllByParentIdAndOwner_Id(Long parentId, Long ownerId);

    List<Task> findAllByIsDoneAndOwner_Id(Boolean isDone, Long ownerId);

    List<Task> findAllByParentIdIsNullAndOwner_Id(Long ownerId);
}
