document.addEventListener('DOMContentLoaded', function() {
    const taskList = document.getElementById('task-list');
    const getBtn = document.getElementById('get-btn');
    const postBtn = document.getElementById('post-btn');
    const delBtn = document.getElementById('del-btn');

    getBtn.addEventListener('click', function() {
        fetch('http://localhost:8080/tasks')
            .then(response => response.json())
            .then(data => {
                // Очищаем список перед обновлением
                taskList.innerHTML = '';

                // Добавляем каждую задачу в список
                data.forEach(task => {
                    const listItem = document.createElement('li');
                    listItem.textContent = task.name; // Предположим, что имя задачи хранится в поле 'name'
                    taskList.appendChild(listItem);
                });
            })
            .catch(error => {
                console.error('Ошибка при выполнении запроса:', error);
            });
    });

    postBtn.addEventListener('click', function() {
        let taskName = document.querySelector('#task-name');

        fetch('http://localhost:8080/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: taskName.value
            })
        })
            .catch(error => {
                console.error('Ошибка при выполнении запроса:', error);
            });

        taskName.value = ''
    });

    delBtn.addEventListener('click', function() {
        fetch('http://localhost:8080/tasks', {
            method: 'DELETE'
        })
            .catch(error => {
                console.error('Ошибка при выполнении запроса:', error);
            });
    });
});
