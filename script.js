const todoInput = document.querySelector('.todo-input');
const btnAdd = document.querySelector('.btn--add');
const todoList = document.querySelector('.todolist');


btnAdd.addEventListener('click' , function (e) {
  e.preventDefault()
  
  if (todoInput.value.match(/\s/g)) {
    todoInput.value = '';
  }
  
  if (todoInput.value === '') {
    console.log('TODO EMPTY');
    return false;
  }
  
  todo.add(todoInput.value);
});

todoList.addEventListener('click' , function (e) {
  const element  = e.target;
  const el = e.target.classList;
  if (el.contains('btn--done')) {
    console.log(e.target);
  }

  if (el.contains('btn--del')) {
    todo.del(element);
  }
});

const todo = {
  add : function (todo) {
    todoList.insertAdjacentHTML('afterbegin' , templateTodo(todo));
    todoInput.value = '';
    todoInput.focus();
  },
  del : function (el) {
    el.parentElement.remove();
  }
}

function templateTodo(todo) {
  return `<div class="todo">        
            <button class="btn btn--done">Done</button>
            <div class="todo-name">${ todo }</div>
            <button class="btn btn--del">Delete</button>
          </div>`;
}