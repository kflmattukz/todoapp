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
    el.nextElementSibling.classList.toggle('line-through');
  },
  load : function (todos) {
    todos.map(item => {
      this.add(item);
    });
    console.log('hello');
  }
}

function templateTodo(id, text, completed) {

  return `<div class="todo flex items-center py-1" id="${ id }">        
            <button class="btn rounded p-2 btn--done bg-green-500 hover:bg-green-600 text-white">Done</button>
            <div class="todo-name flex-auto pl-5 text-gray-600 font-semibold text-xl ${ completed ? 'line-through' : '' }">${ text }</div>
            <button class="btn rounded p-2 btn--del bg-red-500 hover:bg-red-600 text-white">Delete</button>
          </div>`;
}