const todos = [];
const btnAdd = document.querySelector("#btn-add");
const list = document.querySelector("#todos-list");

const url = "http://localhost:4730/todos";

loadTodosData();

btnAdd.addEventListener("click", addTodo);

function loadTodosData() {
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            data.forEach((el) => todos.push(el));
            renderTodos();
        });
}

function renderTodos() {
    list.innerText = "";

    todos.forEach((todo) => {
        const listEl = document.createElement("li");
        listEl.classList.add("todo");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.id = todo.id;
        checkbox.classList.add("todo-checkbox");
        checkbox.checked = todo.done;

        const description = document.createElement("label");
        description.setAttribute("for", checkbox.id);
        description.classList.add("todo-description");
        description.innerText = todo.description;

        const btnDel = document.createElement("button");
        btnDel.classList.add("todo-delete");
        btnDel.innerText = "Delete";

        listEl.append(checkbox, description, btnDel);
        list.append(listEl);
    });
}

function addTodo() {
    const description = document.querySelector("#description");
    const descriptionText = description.value;
    const todo = {
        description: descriptionText,
        done: false,
    };

    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(todo),
    })
        .then((response) => response.json())
        .then((data) => {
            todos.push(data);
            renderTodos();
        });
}
