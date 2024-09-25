package ru.kts_team.back.tag;

import java.util.List;

public interface TaskTagService {
    TaskTag addTag(TaskTag taskTag);

    List<TaskTag> getTags();

    TaskTag getTagById(Long id);

    TaskTag updateTag(TaskTag taskTag);

    void deleteTags();

    void deleteTagById(Long id);
}
