package ru.kts_team.back;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * @author yaroslavberezin
 * @created 29/02/2024
 * @project tp_project
 */

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
}
