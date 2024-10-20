package ru.kts_team.back.tag;

import java.util.List;

public interface TaskTagService {
    TaskTag addTag(TaskTag taskTag);

    List<TaskTag> getTags(Long creatorId);

    TaskTag getTagById(Long id, Long creatorId);

    TaskTag updateTag(TaskTag taskTag);

    void deleteTags();

    void deleteTagById(Long id);
}
