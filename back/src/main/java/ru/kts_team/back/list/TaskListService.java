package ru.kts_team.back.list;

import java.util.List;

public interface TaskListService {
    void addList(TaskList taskList);

    List<TaskList> getLists();

    TaskList getListById(Long id);

    void updateList(TaskList taskList);

    void deleteLists();

    void deleteListById(Long id);
}
