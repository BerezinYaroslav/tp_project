package ru.kts_team.back.list;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class TaskListServiceImpl implements TaskListService {
    private final TaskListRepository repository;

    @Override
    public TaskList addList(TaskList taskList) {
        log.info("Add a list");
        return repository.save(taskList);
    }

    @Override
    public List<TaskList> getLists(Long ownerId) {
        log.info("Get lists");
        return repository.findAllByOwner_Id(ownerId);
    }

    @Override
    public TaskList getListById(Long id, Long ownerId) {
        log.info("Get a list by id");
        return repository.findByIdAndOwner_Id(id, ownerId)
                .orElseThrow(() -> new RuntimeException("There is no a list with id " + id));
    }

    @Override
    public TaskList updateList(TaskList taskList) {
        log.info("Update a list");
        return repository.save(taskList);
    }

    @Override
    public void deleteLists() {
        log.info("Delete lists");
        repository.deleteAll();
    }

    @Override
    public void deleteListById(Long id) {
        log.info("Delete a list with id " + id);
        repository.deleteById(id);
    }
}
