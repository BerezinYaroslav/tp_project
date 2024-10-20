package ru.kts_team.back.tag;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TaskTagRepository extends JpaRepository<TaskTag, Long> {
    List<TaskTag> findAllByCreator_Id(Long ownerId);

    Optional<TaskTag> findByIdAndCreator_Id(Long id, Long ownerId);
}
