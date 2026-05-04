document.addEventListener('DOMContentLoaded', function () {
    const todoInput = document.getElementById('todoInput');
    const addbutton = document.getElementById('addbutton');
    const list = document.getElementById("list");
    let todos = JSON.parse(localStorage.getItem('todos')) || [];

    function rendertodo() {
        list.innerHTML = "";
        todos.forEach((todo, index) => {
            const listitem = document.createElement('li');
            listitem.className = 'list-group-item d-flex justify-content-between align-items-center';

            if (todo.completed) {
                listitem.classList.add('completed');
            }

            listitem.textContent = todo.text;

            const deleteButton = document.createElement('button');
            deleteButton.className = 'btn btn-danger btn-sm';
            deleteButton.textContent = 'Delete';

            deleteButton.addEventListener('click', () => {
                deletetodo(index);
            });

            listitem.addEventListener('click', () => {
                toggleTodoComplete(index);
            });

            listitem.appendChild(deleteButton);
            list.appendChild(listitem);
        });
    }

    function deletetodo(index) {
        todos.splice(index, 1);
        savetodo();
        rendertodo();
    }

    function toggleTodoComplete(index) {
        todos[index].completed = !todos[index].completed;
        savetodo();
        rendertodo();
    }

    function addtodo() {
        var tasktext = todoInput.value.trim();
        if (tasktext == "") return;

        todos.push({ text: tasktext, completed: false });
        todoInput.value = '';
        savetodo();
        rendertodo();
    }

    function savetodo() {
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    addbutton.addEventListener('click', addtodo);

    todoInput.addEventListener('keypress', (event) => {
        if (event.key == "Enter") {
            addtodo();
        }
    });

    rendertodo();
});
