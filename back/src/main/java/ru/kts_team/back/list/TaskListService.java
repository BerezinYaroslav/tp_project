package ru.kts_team.back.list;

import java.util.List;

public interface TaskListService {
    TaskList addList(TaskList taskList);

    List<TaskList> getLists();

    TaskList getListById(Long id);

    TaskList updateList(TaskList taskList);

    void deleteLists();

    void deleteListById(Long id);
}
