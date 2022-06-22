const todos = [];
const btnAdd = document.querySelector("#btn-add");
const list = document.querySelector("#todos-list");

const url = "http://localhost:4730/todos/";

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
        checkbox.addEventListener("click", updateTodo);

        const description = document.createElement("label");
        description.setAttribute("for", checkbox.id);
        description.classList.add("todo-description");
        description.innerText = todo.description;

        const btnDel = document.createElement("button");
        btnDel.classList.add("todo-delete");
        btnDel.innerText = "Delete";
        btnDel.dataset.id = todo.id;
        btnDel.addEventListener("click", deleteTodo);

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

function updateTodo() {
    const id = Number(this.id);
    const todo = todos.find((obj) => obj.id === id);
    todo.done = this.checked;

    const updatedTodo = {
        id: id,
        description: todo.description,
        done: this.checked,
    };

    console.log(updatedTodo);

    fetch(url + id, {
        method: "PUT",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(updatedTodo),
    }).then((res) => res.json());
}

function deleteTodo(e) {
    const id = Number(e.target.dataset.id);
    const index = todos.findIndex((obj) => obj.id === id);
    todos.splice(index, 1);

    fetch(url + id, {
        method: "DELETE",
    })
        .then((res) => res.json())
        .then(() => renderTodos());
}
