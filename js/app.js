const todoInput = document.querySelector('.todo-input');
const todoAdd =  document.querySelector('.todo-add');
const todoList = document.querySelector('.todo-list');

const todos = [];

todoAdd.addEventListener('click' , function (e){
    e.preventDefault();
    todo.add(todoInput.value);
});

todoList.addEventListener('click' , function(e){
    const el = e.target;
    if (el.classList.contains('completed')) {
        todo.toggleCompleted(el);
    }
    if (el.classList.contains('remove')) {
        todo.remove(todo.getTodoId(el));
        console.log(todo.getTodoId(el));
    }
});

/// Trigger EDIT
todoList.addEventListener('dblclick', function(e){
    const el = e.target;
    const id  = todo.getTodoId(el);
    
    if (el.classList.contains('edit')) {
        console.log();
        todoList.querySelectorAll('.update').forEach(function (update){
            if(update.classList.contains('update') && update.classList.contains('hidden')) {
                // update.classList.add('hidden');
            } else {
                update.classList.toggle('hidden');
                update.previousElementSibling.classList.toggle('hidden');
            }
        })
        console.log('edit');
        el.classList.toggle('hidden');
        el.nextElementSibling.classList.toggle('hidden');
        el.nextElementSibling.focus();
        el.nextElementSibling.select();
        el.nextElementSibling.addEventListener('keyup' , function(e){
            if (e.keyCode === 13) {
                todo.update(id , e.target.value);
                e.target.classList.toggle('hidden');
                e.target.previousElementSibling.innerText = e.target.value;
                e.target.previousElementSibling.classList.toggle('hidden');
            }
            
        });
    }
});

const todo = {
    getRandomId: function () {
        return Math.random().toString(36).substr(2, 9);
    },
    getTodoId: function (element) {
        return element.parentElement.getAttribute('id');
    },
    getIndexTodo: function (el) {
        
        // return indexTodo;
    },
    add: function (text) {
        const _id = this.getRandomId();
        todos.push(objTodo(_id , text));
        localStorage.setItem(_id , JSON.stringify(todos[todos.length-1] , null ,4));
        todoList.insertAdjacentHTML("afterbegin", templateTodo(todos[todos.length-1]), todos.length -1 );
    },
    update: function (id , text) {
        // let indexTodo = 0;
        todos.map(todo => {
            if (todo.id === id){
                todo.text = text;
                localStorage.setItem(todo.id , JSON.stringify(todo));
            }
        });
    },
    remove: function (id) {
        localStorage.removeItem(id);
        todoList.innerHTML = '';
        this.loadLocalStorage();
    },
    toggleCompleted: function(el) {
        let indexTodo = 0;
        todos.map(todo => {
            if (todo.id === this.getTodoId(el)){
                // console.log(todos[indexTodo].id);
                if (todos[indexTodo].completed === false) {
                    todos[indexTodo].completed = true;
                    localStorage.setItem(todos[indexTodo].id , JSON.stringify(todos[indexTodo]));
                } else {
                    todos[indexTodo].completed = false;
                    localStorage.setItem(todos[indexTodo].id , JSON.stringify(todos[indexTodo]));
                }
            } else {
                indexTodo +=1;
            }
        });
        el.nextElementSibling.classList.toggle('line-through');
    },
    loadLocalStorage: function () {
        if (localStorage.key(0) === null) {
            console.log('local storage is empty');
        } else {
            for (let i = 0 ; i < localStorage.length ; i++) {
                todos.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
                todoList.insertAdjacentHTML("afterbegin", templateTodo(todos[todos.length-1]));
            }
        }
    }
}

const templateTodo = ( {id , text , completed} = todo )  => {
    // console.log(todo.completed);
    return `<div class="todo flex items-center bg-white shadow-md rounded-md overflow-hidden" id="${ id }">
                <button class="completed text-gray-50 py-2 px-3 bg-green-500 hover:text-green-900">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </button>
                <div class="todo-name edit flex-auto mx-2 truncate text-gray-700 font-medium ${ completed ? 'line-through' : '' }">${ text }</div>
                <input type="text" class="update hidden flex-auto mx-2 outline-none focus:ring ring-blue-500 text-gray-600 font-medium p-1 rounded shadow-lg border border-gray-400" value="${ text }">
                <button class="remove text-gray-50 py-2 px-3 bg-red-500 hover:text-red-900">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </button>
            </div>`;
}

const objTodo = (id,text) => {
    return {
        id: id,
        text : text,
        completed: false
    }
}

todo.loadLocalStorage();