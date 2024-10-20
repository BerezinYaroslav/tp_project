package ru.kts_team.back.tag;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class TaskTagServiceImpl implements TaskTagService {
    private final TaskTagRepository repository;

    @Override
    public TaskTag addTag(TaskTag taskTag) {
        log.info("Add a tag");

        if (taskTag.getColor() == null) {
            taskTag.setColor("#ffffff");
        }

        return repository.save(taskTag);
    }

    @Override
    public List<TaskTag> getTags(Long creatorId) {
        log.info("Get tags");
        return repository.findAllByCreator_Id(creatorId);
    }

    @Override
    public TaskTag getTagById(Long id, Long creatorId) {
        log.info("Get a tag by id");
        return repository.findByIdAndCreator_Id(id, creatorId)
                .orElseThrow(() -> new RuntimeException("There is no a tag with id " + id));
    }

    @Override
    public TaskTag updateTag(TaskTag taskTag) {
        log.info("Update a tag");
        return repository.save(taskTag);
    }

    @Override
    public void deleteTags() {
        log.info("Delete tags");
        repository.deleteAll();
    }

    @Override
    public void deleteTagById(Long id) {
        log.info("Delete a tag with id " + id);
        repository.deleteById(id);
    }
}
