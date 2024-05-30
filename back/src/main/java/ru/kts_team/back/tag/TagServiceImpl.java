package ru.kts_team.back.tag;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class TagServiceImpl implements TagService {
    private final TagRepository repository;

    @Override
    public void addTag(Tag tag) {
        log.info("Add a tag");

        if (tag.getColor() == null) {
            tag.setColor("#ffffff");
        }

        repository.save(tag);
    }

    @Override
    public List<Tag> getTags() {
        log.info("Get tags");
        return repository.findAll();
    }

    @Override
    public Tag getTagById(Long id) {
        log.info("Get a tag by id");
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("There is no a tag with id " + id));
    }

    @Override
    public void updateTag(Tag tag) {
        log.info("Update a tag");
        repository.save(tag);
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
