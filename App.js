//TODO : add counter component that will count all task , completed task , ongoing task

const root = document.getElementById('root')

function formInput () {
  return `<div class='form-input w-4/5 sm:w-3/5 md:w-2/5 lg:w-2/6 mx-auto'>
            <form id='todo-form' class="flex group-focus:outline outline-sky-700/25 items-center border border-sky-600/50 rounded-lg shadow-lg overflow-hidden">
                <input  class="group py-1 px-3 flex-grow text-lg text-gray-500 outline-none" id='todo-input' type='text' name='item' placeholder='Enter new Item here...' />
                <button class="px-6 py-2 bg-sky-500 font-semibold text-gray-50 tracking-wide lowercase">&#10009;</button>
            </form>
            </div>

          <div id='item-list' class="flex flex-col gap-1 mt-5 w-4/5 sm:w-3/5 md:w-2/5 lg:w-2/6 mx-auto"></div>`
}

root.insertAdjacentHTML('afterbegin' , formInput())

function todoList ({id ,task ,completed}) {
  return `<div class='item flex items-center border border-gray-200 bg-white rounded-md shadow-md overflow-hidden' item-id=${id} >
            <div class='flex-grow toggle-complete ml-3 font-medium text-gray-500 truncate ${completed ? 'line-through' : ''} '>${task}</div>
            <div class='action flex'>
              <button class='px-4 py-2 remove bg-red-600 hover:bg-red-700 duration-300 font-semibold text-gray-200 hover:text-gray-50 tracking-wide'>&#10006</button>
              <button class='px-3 py-2 edit bg-green-600 hover:bg-green-700 duration-300 font-semibold text-gray-200 hover:text-gray-50 tracking-wide'>&#9998;</button>
            </div>
          </div>`
}

function updateInput ({id , task , completed}) {
  return `<div class='update'>
            <form id='update-form' class="flex group-focus:outline outline-green-700/25 items-center border border-green-600/50 rounded-lg shadow-lg overflow-hidden">
              <input id='update-id' value=${id} hidden />
              <input id='update-complete' value=${completed} hidden />
              <input class="group px-3 flex-grow text-lg text-gray-500 outline-none" id='update-task' type='text' name='update-todo' value='${task}' />
              <button class='update px-5 py-2 bg-green-500 font-semibold text-gray-50 tracking-wide lowercase'>&#10004;</button>  
            </form>
          </div>`
}

function todoInfo({all,ongoing,completed}) {
  return `<div class='flex w-4/5 sm:w-3/5 md:w-2/5 lg:w-2/6 mx-auto mt-5 bg-white border border-gray-300 rounded-md shadow-md p-2 items-center justify-between font-semibold text-gray-500 text-sm'>
            <div>All : ${all}</div>
            <div>Ongoing : ${ongoing}</div>
            <div>Complete : ${completed}</div>
          </div>`
}

const todoForm = document.getElementById('todo-form')
const todoInput = document.getElementById('todo-input')
const itemList = document.getElementById('item-list')

todoInput.focus()

todoForm.addEventListener('submit' , function(event) {
  event.preventDefault()
  if (todoInput.value === '') {
    console.log('task can\'t be empty')
    //TODO: change the value of placeholder if input empty and give errro message
    return
  }
  Todo.addTodo(todoObject(todoInput.value))
  todoInput.value = ''
})


document.addEventListener('click' , function(event) {
  if (event.target.classList.contains('remove')) {
    Todo.removeTodo(event.target.parentElement.parentElement.getAttribute('item-id'))
  }

  if (event.target.classList.contains('edit')) {
    console.log(event.target.parentElement.parentElement)
    itemList.innerHTML = ''
    itemList.insertAdjacentHTML('afterbegin' , updateInput(Data.getById(event.target.parentElement.parentElement.getAttribute('item-id'))))
    if (document.getElementById('update-task')) {
      document.getElementById('update-task').select()
      return
    }
  }
})


document.addEventListener('dblclick' , function(event) {
  if (event.target.classList.contains('toggle-complete')) {
    console.log('toggle complete')
    Todo.toggleCompletedTodo(event.target.parentElement.getAttribute('item-id'))
  }
})

document.addEventListener('submit', updateListener)

// let todos = []

const Data = {
  getId(index) {
    return localStorage.key(index)
  },
  getById(id) {
    return JSON.parse(localStorage.getItem(id))
  },
  getByIndex(index) {
    return JSON.parse(localStorage.getItem(this.getId(index)))
  },
  getAll() {
    let result = []
    if (localStorage.length > 0) {
      for (let i = 0; i < localStorage.length; i++) {
        const todo = Data.getByIndex(i)
        result.push(todo)
      }
    }
    return result.sort((a,b) => a.id - b.id)
  },
  store(id, todo) {
    localStorage.setItem(id , JSON.stringify(todo , 4,null))
  },
  remove(id) {
    const todo = this.getById(id)
    localStorage.removeItem(id)
  }
}

const Todo = {
  addTodo(todo) {
    if (itemList.nextElementSibling) {
      itemList.nextElementSibling.remove()
    }
    Data.store(todo.id , todo)
    loadTodo()
  },
  removeTodo(id) {
    Data.remove(id)
    loadTodo()
  },
  toggleCompletedTodo(id) {
    const result = Data.getAll()
    result.map(todo => {
      if ('' + todo.id === id) {
        todo.completed = !todo.completed
      }
      Data.store(todo.id , todo)
    })
    loadTodo()
  },
  getTodoInfo() {
    const result = Data.getAll()
    let info = {
      all : result.length,
      ongoing : result.filter(todo => todo.completed !== true).length,
      completed : result.filter(todo => todo.completed === true).length
    }
    return info
  }
}


function loadTodo () {

  if (localStorage.length > 0) {
    itemList.innerHTML = ''
    const result = Data.getAll()
    result.map(todo => {
      itemList.insertAdjacentHTML('afterbegin' , todoList(todo))
    })
    if (itemList.nextElementSibling) {
      itemList.nextElementSibling.remove()
    }
    itemList.insertAdjacentHTML('afterend' , todoInfo(Todo.getTodoInfo()))
    return
  }
  itemList.innerHTML = ''
  if (itemList.nextElementSibling) {
    itemList.nextElementSibling.remove()
  }
  itemList.insertAdjacentHTML('afterend' , todoInfo(Todo.getTodoInfo()))
  itemList.insertAdjacentHTML('afterend' , "<p class='empty text-center text-2xl font-light text-gray-600 capitalize'>task empty... <br/> input more task</p>")
  // itemList.insertAdjacentHTML('afterend' , todoInfo({all: 10 , ongoing: 3, completed: 2}))
}


// Load data from localStorage and render it to html
loadTodo()


function updateListener(event) {
  if (event.target.getAttribute('id') === 'todo-form') {
    return
  }
  event.preventDefault()
  const updateId = document.getElementById('update-id').value
  const updateTask = document.getElementById('update-task').value
  const updateComplete = document.getElementById('update-complete').value === 'true'
  
  const todo = {
    id :updateId,
    task: updateTask,
    completed: updateComplete
  }

  Data.store(updateId , todo)

  loadTodo()
  todoInput.focus()
}

function todoObject (task) {
  return {
    id: Date.now(),
    task: task,
    completed: false
  }
}