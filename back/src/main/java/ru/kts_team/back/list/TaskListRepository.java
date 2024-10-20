package ru.kts_team.back.list;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TaskListRepository extends JpaRepository<TaskList, Long> {
    List<TaskList> findAllByOwner_Id(Long ownerId);

    Optional<TaskList> findByIdAndOwner_Id(Long id, Long ownerId);
}
