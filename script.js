const todoInput = document.querySelector('.todo-input');
const btnAdd = document.querySelector('.btn--add');
const todoList = document.querySelector('.todolist');

btnAdd.addEventListener('click' , function (e) {
  e.preventDefault()
  
  if (todoInput.value === '') {
    console.log('TODO EMPTY');
    return false;
  }
  
  todo.add(30,todoInput.value , false);
});

todoList.addEventListener('click' , function (e) {
  const element  = e.target;
  const el = e.target.classList;
  if (el.contains('btn--done')) {
    // console.log(e.target);
    todo.done(element);
  }

  if (el.contains('btn--del')) {
    todo.del(element);
  }
});

const todo = {
  add : function (id,text,completed) {
    todoList.insertAdjacentHTML('afterbegin' , templateTodo(id , text , completed));
    todoInput.value = '';
    todoInput.focus();
  },
  del : function (el) {
    el.parentElement.remove();
  },
  done : function (el) {
    el.nextElementSibling.classList.toggle('completed');
  },
  load : function (todos) {
    todos.map(item => {
      this.add(item);
    });
    console.log('hello');
  }
}

function templateTodo(id, text, completed) {

  return `<div class="todo" id="${ id }">        
            <button class="btn btn--done">Done</button>
            <div class="todo-name ${ completed ? 'completed' : '' }">${ text }</div>
            <button class="btn btn--del">Delete</button>
          </div>`;
}