package ru.kts_team.back.tag;

import java.util.List;

public interface TagService {
    void addTag(Tag tag);

    List<Tag> getTags();

    Tag getTagById(Long id);

    void updateTag(Tag tag);

    void deleteTags();

    void deleteTagById(Long id);
}
