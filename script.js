const todoInput = document.querySelector(".todo-input");
const btnAdd = document.querySelector(".add");
const todoList = document.querySelector(".todo-list");
const todoStat = document.querySelector(".todo-status");


todoInput.focus();

btnAdd.addEventListener('click', function (e) {
  e.preventDefault();

  if (todoInput.value === '') {
    todoInput.setAttribute('placeholder' , 'Todo name can\'t be empty');
  }

  todo.add(todoInput.value);

});

todoList.addEventListener('click' , function (e) {
  
  if (e.target.classList.contains('del')) {
    todo.del(e.target);
  }
  
  if (e.target.classList.contains('done')) {
    todo.done(e.target);
  }
});

todoList.addEventListener('dblclick' , function (e) {
  if (e.target.classList.contains('todo-name')){
    // console.log(e.target.innerText);
    let defValue = e.target.innerText;
    // console.log(e.target.parentElement);
    
    e.target.parentElement.insertAdjacentHTML('afterend' , todoEdit(defValue));
    e.target.parentElement.remove();

  }

  document.querySelector('.edit').addEventListener('keypress' , function (e) {
    if ( e.keyCode === 13 ) {
      // console.log(e.target.value);
      // console.log('edit done');
      e.target.parentElement.parentElement.insertAdjacentHTML('afterend' , todoTemplate(e.target.value));
      e.target.parentElement.parentElement.remove();
      // console.log(e.target.parentElement.parentElement);
    }
  });

});



const todo = {
  add : function (todo) {
    todoList.insertAdjacentHTML('afterend' , todoTemplate(todo));
    todoInput.value = '';
    todoInput.focus();
  },
  del : function (element) {
    element.parentElement.remove();
  },
  done : function (element) {
    element.nextElementSibling.classList.toggle('complete');
  },
  edit : function (element) {
    
  }
}



function todoTemplate (todo) {
  return `<div class="todo">
  <button class="btn done">
    <svg  class="svg-done" aria-hidden="true" data-prefix="far" data-icon="check-circle"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm0 48c110.532 0 200 89.451 200 200 0 110.532-89.451 200-200 200-110.532 0-200-89.451-200-200 0-110.532 89.451-200 200-200m140.204 130.267l-22.536-22.718c-4.667-4.705-12.265-4.736-16.97-.068L215.346 303.697l-59.792-60.277c-4.667-4.705-12.265-4.736-16.97-.069l-22.719 22.536c-4.705 4.667-4.736 12.265-.068 16.971l90.781 91.516c4.667 4.705 12.265 4.736 16.97.068l172.589-171.204c4.704-4.668 4.734-12.266.067-16.971z"/></svg>
  </button>
  <div class="todo-name">
    ${ todo }
  </div>
  <button class="btn del">
    <svg class="svg-del" aria-hidden="true" data-prefix="far" data-icon="trash-alt" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M268 416h24a12 12 0 0012-12V188a12 12 0 00-12-12h-24a12 12 0 00-12 12v216a12 12 0 0012 12zM432 80h-82.41l-34-56.7A48 48 0 00274.41 0H173.59a48 48 0 00-41.16 23.3L98.41 80H16A16 16 0 000 96v16a16 16 0 0016 16h16v336a48 48 0 0048 48h288a48 48 0 0048-48V128h16a16 16 0 0016-16V96a16 16 0 00-16-16zM171.84 50.91A6 6 0 01177 48h94a6 6 0 015.15 2.91L293.61 80H154.39zM368 464H80V128h288zm-212-48h24a12 12 0 0012-12V188a12 12 0 00-12-12h-24a12 12 0 00-12 12v216a12 12 0 0012 12z"/></svg>
  </button>
`;
}

function todoEdit (defValue) {
  return `<div class="todo">
            <button class="btn done">
              <svg  class="svg-done" aria-hidden="true" data-prefix="far" data-icon="check-circle"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm0 48c110.532 0 200 89.451 200 200 0 110.532-89.451 200-200 200-110.532 0-200-89.451-200-200 0-110.532 89.451-200 200-200m140.204 130.267l-22.536-22.718c-4.667-4.705-12.265-4.736-16.97-.068L215.346 303.697l-59.792-60.277c-4.667-4.705-12.265-4.736-16.97-.069l-22.719 22.536c-4.705 4.667-4.736 12.265-.068 16.971l90.781 91.516c4.667 4.705 12.265 4.736 16.97.068l172.589-171.204c4.704-4.668 4.734-12.266.067-16.971z"/></svg>
            </button>
            <div class="todo-name">
              <input class="edit" type="text" value="${ defValue }">
            </div>
            <button class="btn del">
              <svg class="svg-del" aria-hidden="true" data-prefix="far" data-icon="trash-alt" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M268 416h24a12 12 0 0012-12V188a12 12 0 00-12-12h-24a12 12 0 00-12 12v216a12 12 0 0012 12zM432 80h-82.41l-34-56.7A48 48 0 00274.41 0H173.59a48 48 0 00-41.16 23.3L98.41 80H16A16 16 0 000 96v16a16 16 0 0016 16h16v336a48 48 0 0048 48h288a48 48 0 0048-48V128h16a16 16 0 0016-16V96a16 16 0 00-16-16zM171.84 50.91A6 6 0 01177 48h94a6 6 0 015.15 2.91L293.61 80H154.39zM368 464H80V128h288zm-212-48h24a12 12 0 0012-12V188a12 12 0 00-12-12h-24a12 12 0 00-12 12v216a12 12 0 0012 12z"/></svg>
            </button>
          </div>`;
}