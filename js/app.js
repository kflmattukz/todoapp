const todoInput = document.querySelector('.todo-input');
const todoList = document.querySelector('.todo-list');
const btnAdd = document.querySelector('.btn-add');

let todos = [];

//load data from localStorage

if (localStorage.getItem('todos') === null) {
  localStorage.setItem('todos' , JSON.stringify(todos));
} else {
  todos = JSON.parse(localStorage.getItem('todos'));
  todos.map(todo => {
    todoList.insertAdjacentHTML('beforeend' , templateTodo(todo));
  });
}

btnAdd.addEventListener('click' , function(e){
  e.preventDefault();

  if (todoInput.value === '') {
    // give error that todo text can't be empty
  } else {
    todo.add(todoInput.value);
  }
});

todoList.addEventListener('click' , function (e) {
  const el = e.target;
  if (el.classList.contains('delete')) {
    // console.log('delete');
    // e.target.parentElement.remove();
    todo.del(el);
  }

  if (el.classList.contains('complete')) {
    // console.log('completed');
    todo.completed(el);
  }
});

todoList.addEventListener('dblclick' , function (e) {
  if ( e.target.classList.contains('edit')) {
    console.log('edit');
    todo.edit(e.target);
    //change the border color
  }
});

todoList.addEventListener('keypress' , function (e){
  if (e.keyCode === 13) {
    if (e.target.classList.contains('update')) {
      //update todo text
      todo.update(e.target);
    }
  }
});

const todo = {
  add : function (todo) {
    const newTodo = {
      id : todos.length+1,
      text : todoInput.value,
      completed : false
    };
    todos.push(newTodo);
    localStorage.setItem('todos' , JSON.stringify(todos));
    todoList.insertAdjacentHTML('beforeend' , templateTodo(newTodo));
    todoInput.value = '';
    todoInput.focus();
  },
  del : function (element) {
    element.parentElement.remove();
  },
  completed : function (element) {
    element.parentElement.classList.toggle('border-blue-400');
    element.parentElement.classList.toggle('border-green-400');
    element.nextElementSibling.classList.toggle('line-through');
  },
  edit : function (element) {
    element.classList.add('hidden');
    element.nextElementSibling.classList.remove('hidden');
    element.nextElementSibling.focus();
    element.nextElementSibling.select();
    element.parentElement.classList.remove('border-blue-400');
    element.parentElement.classList.add('border-yellow-400');
    // change the border color
  },
  update : function (element) {
    const newValue = element.value;
    element.classList.add('hidden');
    element.previousElementSibling.classList.remove('hidden');
    element.previousElementSibling.innerText = newValue;
    element.parentElement.classList.remove('border-yellow-400');
    element.parentElement.classList.add('border-blue-400');
  }
}


function templateTodo({id, text, completed} = todo) {
  return `<div class="todo bg-white border border-blue-400 flex items-center py-2 px-1 rounded-md" id="${ id }">
            <button class="complete text-green-600 hover:text-green-500">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
            <div class="edit todo-text flex-auto pl-3 text-gray-600 ${ completed ? 'line-through' : '' }">${ text }</div>
            <input type="text" class="hidden update flex-auto outline-none pl-3 text-gray-500" value="${ text }">
            <button class="delete text-red-600 hover:text-red-500">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
          </div>`;
}