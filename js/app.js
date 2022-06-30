const todoInput = document.getElementById("todo-input");
const todoAdd = document.getElementById("todo-add");
const todoList = document.getElementById("todo-list");

let todos = [];
//localStorage function
const data = {
  getId(id) {
    return localStorage.key(id);
  },
  store(id, content) {
    localStorage.setItem(id, JSON.stringify(content), null, 4);
  },
  getByIndex(index) {
    return JSON.parse(localStorage.getItem(this.getId(index)));
  },
  getById(id) {
    return JSON.parse(localStorage.getItem(id));
  },
  remove(id) {
    localStorage.removeItem(id);
  },
};

// TODO:  when todos empty and add item the empty message not dissapear
const todo = {
  getTodoId(el) {
    return el.parentElement.getAttribute("id");
  },
  add(text) {
    const _id = Date.now();
    todos.push(objTodo(_id, text));
    data.store(_id, todos[todos.length - 1]);
    this.loadLocalStorage();
    todoInput.value = "";
    return;
  },
  update(id, text) {
    todos.map((todo) => {
      const todoid = "" + todo.id; // Converting it to string
      if (todoid === id) {
        todo.text = text;
        data.store(todo.id,todo);
      }
      return;
    });
    return;
  },
  remove(id) {
    data.remove(id);
    this.loadLocalStorage();
  },
  toggleCompleted(el) {
    todos.map((todo, i) => {
      // '' + todo.id ---> convert number to string
      let todoid = "" + todo.id
      if (todoid === this.getTodoId(el)) {
        todos[i].completed = !todos[i].completed
        data.store(todos[i].id,todos[i])
      }
    });
    el.nextElementSibling.classList.toggle("line-through");
    el.parentElement.classList.toggle("opacity-80");
    return;
  },
  loadLocalStorage() {
    // Emptying todos and remove all item in todolist
    todos = [];
    todoList.innerHTML = "";
    if (localStorage.length > 0) {
      for (let i = 0; i < localStorage.length; i++) {
        todos.push(data.getByIndex(i));
      }
      todos
        .sort((a, b) => a.id - b.id)
        .forEach((todo) => {
          todoList.insertAdjacentHTML("beforeend", templateTodo(todo));
        });
    } else {
      todoList.innerHTML =
        '<h3 class="text-center font-semibold text-2xl text-gray-600">Todo\'s empty , add todo on input</h3>';
    }
    return;
  },
};

document.addEventListener("submit", function (e) {
  e.preventDefault();
  if (todoInput.value === "") {
    todoInput.parentElement.classList.add("border", "border-red-700");
    todoInput.classList.add("bg-red-100");
    todoInput.setAttribute("placeholder", "todo item can't be empty");
  } else {
    todoInput.parentElement.classList.remove(
      "bg-red-100",
      "border",
      "border-red-700"
    );
    todoInput.classList.remove("bg-red-100");
    todo.add(todoInput.value);
    todoInput.setAttribute("placeholder", "type here");
  }
});

todoList.addEventListener("click", function (e) {
  const el = e.target;
  if (el.classList.contains("completed")) todo.toggleCompleted(el)
  if (el.classList.contains("remove")) {
    todo.remove(todo.getTodoId(el))
  }

});

/// Trigger EDIT
todoList.addEventListener("dblclick", function (e) {
  const el = e.target;
  const id = todo.getTodoId(el);

  if (el.classList.contains("edit")) {
    todoList.querySelectorAll(".update").forEach(function (update) {
      update.classList.contains("update") && update.classList.contains("hidden")
        ? ""
        : (update.classList.toggle("hidden"),
          update.previousElementSibling.classList.toggle("hidden"));
    });

    el.classList.toggle("hidden");
    el.nextElementSibling.classList.toggle("hidden");
    el.nextElementSibling.focus();
    el.nextElementSibling.select();
    el.nextElementSibling.addEventListener("keyup", function (e) {
      const elm = e.target;
      if (e.keyCode === 13) {
        todo.update(id, elm.value);
        elm.classList.toggle("hidden");
        elm.previousElementSibling.innerText = elm.value;
        elm.previousElementSibling.classList.toggle("hidden");
      }
    });
  }
});

function templateTodo({ id, text, completed }){
  return `<div class="todo flex items-center bg-white shadow-md rounded-md overflow-hidden ${completed ? 'opacity-80' : ''}" id="${id}">
              <button class="completed text-gray-50 py-2 px-3 bg-green-500 transition duration-500 ease-in-out hover:text-green-900">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
              </button>
              <div class="todo-name edit flex-auto mx-2 truncate text-gray-700 font-medium ${
                completed ? "line-through" : ""
              }">${text}</div>
              <input type="text" class="update hidden flex-auto mx-2 outline-none focus:ring ring-blue-500 text-gray-600 font-medium p-1 rounded shadow-lg border border-gray-400" value="${text}">
              <button class="remove text-gray-50 py-2 px-3 bg-red-500 transition duration-500 ease-in-out hover:text-red-900">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
              </button>
          </div>`;
};

//structure todo item on database
function objTodo(id, text){
  return {
    id: id,
    text: text,
    completed: false,
  };
};

todo.loadLocalStorage();
