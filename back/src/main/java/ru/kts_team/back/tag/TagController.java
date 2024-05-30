package ru.kts_team.back.tag;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tags")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class TagController {
    private final TagService service;

    @PostMapping
    public void addTag(@Valid @RequestBody Tag tag) {
        service.addTag(tag);
    }

    @GetMapping
    public List<Tag> getTags() {
        return service.getTags();
    }

    @GetMapping("/{id}")
    public Tag getTagById(@PathVariable Long id) {
        return service.getTagById(id);
    }

    @PatchMapping
    public void updateTag(@Valid @RequestBody Tag tag) {
        service.updateTag(tag);
    }

    @DeleteMapping
    public void deleteTags() {
        service.deleteTags();
    }

    @DeleteMapping("/{id}")
    public void deleteTagById(@PathVariable Long id) {
        service.deleteTagById(id);
    }
}
