// An empty array to hold our todos
let todos = [];

// Key for local storage
const key = "todo";

window.onload = () => {

    loadTodos();

    let submitTodo = document.getElementById("submit");
        submitTodo.onclick = createTodo;

    let deleteTodos = document.getElementById("delete");
        deleteTodos.onclick = deleteAll;
};

const deleteAll = () => {
    let ul = document.getElementById("todos");
    ul.parentNode.removeChild(ul);
    todos = [];
    localStorage.clear();
}

const createTodo = () => {
    const todoText = document.getElementById("todo");
        todo = todoText.value;

    if(todo === null || todo === "" || todo.length <= 0) {
        alert("Please enter an item");
        return;
    }

    // pushing our todo to todos array
    todos.push(todo);

    // Store new list of Todos into local storage
    storeTodos();

    // Display our Todos to the page
    displayTodos(todo);
}

// Convert and store the todos array to local storage
const storeTodos = () => {
    const jsonTodos = JSON.stringify(todos);
        localStorage.setItem(key, jsonTodos);
}

// Parse and loop over local storage to display all todos
const loadTodos = () => {
    let jsonTodos = localStorage.getItem(key);

    if(jsonTodos != null) {
        todos = JSON.parse(jsonTodos);

        for(let i = 0; i < todos.length; i++) {
            displayTodos(todos[i]);
        }
    }
}

const displayTodos = (todo) => {
    let todoList = document.getElementById("todos");
    let div = document.createElement("div");
        div.className = "d-flex flex-row todo";
        div.id = "todo-entry"

    let input = document.createElement("input");
        input.className = "p-2 checkbox"
        input.type = "checkbox";

    let li = document.createElement("li");
    li.className = "p-2"
        li.id = "value";
        li.innerHTML = todo;

    let i = document.createElement("i");
        i.className = "fa fa-trash-o p-2";
        i.id = "delete-todo";

    div.appendChild(input);
    div.appendChild(li);
    div.appendChild(i);

        if(todoList.childElementCount > 0) {
            todoList.insertBefore(div, todoList.firstChild);
        } else {
            todoList.appendChild(div);
        }
    
}

const checkboxes = document.querySelectorAll('.checkbox input[type="checkbox"]');

const handleCheck = (e) => {
    let lastChecked;
    let inBetween = false;
    if(e.shiftKey && this.checked) {
        checkboxes.forEach(checkbox => {
            if(checkbox === this || checkbox === lastChecked) {
                inBetween = !inBetween;
            }
            if(inBetween) {
                checkbox.checked = true;
            }
        });
    }
    lastChecked = this;
}

checkboxes.forEach(checkbox => checkbox.addEventListener('click', handleCheck));