import formInput from "./components/formInput.js"
import todoList from "./components/todoList.js"
import todoUpdate from "./components/todoUpdate.js"
import todoInfo from "./components/todoInfo.js"

document.getElementById('root').insertAdjacentHTML('afterbegin' , formInput())

const todoForm = document.getElementById('todo-form')
const todoInput = document.getElementById('todo-input')
const itemList = document.getElementById('item-list')

todoInput.focus()

document.addEventListener('submit' , function (event) {
  event.preventDefault()
  if (event.target.getAttribute('id') === 'todo-form') {
    if (todoInput.value === '') {
      // console.log('task can\'t be empty')
      // console.log(todoInput.placeholder)
      todoInput.placeholder = 'Task can\'t be empty, please type your task...'
      todoForm.classList.remove('border-sky-600/50')
      todoForm.classList.add('border-red-600/60')
      //TODO: change the value of placeholder if input empty and give errro message
      return
    }
  
    todoInput.placeholder = 'Enter new Item here...'
    todoForm.classList.remove('border-red-600/60')
    todoForm.classList.add('border-sky-600/50')
  
    Todo.addTodo({
      id: Date.now(),
      task: todoInput.value,
      completed: false
    })
    todoInput.value = ''
    return
  }

  if (event.target.getAttribute('id') === 'todo-form') {
    return
  }
  event.preventDefault()
  const updateId = document.getElementById('update-id').value
  const updateTask = document.getElementById('update-task').value
  const updateComplete = document.getElementById('update-complete').value === 'true'
  
  if (updateTask === '') {
    document.getElementById('update-task').placeholder = 'Task can\'t be empty, please type your task...'
    event.target.classList.remove('border-sky-600/50')
    event.target.classList.add('border-red-600/60')
    return
  }

  Data.store(updateId , {
    id :updateId,
    task: updateTask,
    completed: updateComplete
  })
  loadTodo()
  todoInput.focus()
})

document.addEventListener('click' , function(event) {

  if (event.target.classList.contains('remove')) {
    console.log('remove ?')
    Todo.removeTodo(event.target.parentElement.parentElement.getAttribute('item-id'))
  }

  if (event.target.classList.contains('edit')) {
    itemList.innerHTML = ''
    itemList.insertAdjacentHTML('afterbegin' , todoUpdate(Data.getById(event.target.parentElement.parentElement.getAttribute('item-id'))))
    if (document.getElementById('update-task')) {
      document.getElementById('update-task').select()
      return
    }
  }

  if (event.target.classList.contains('toggle-completed')) {
    itemList.innerHTML = ''
    const result = Data.getComplete()
    result.map(todo => {
      itemList.insertAdjacentHTML('afterbegin' , todoList(todo))
    })
  }

  if (event.target.classList.contains('toggle-ongoing')) {
    itemList.innerHTML = ''
    const result = Data.getOngoing()
    result.map(todo => {
      itemList.insertAdjacentHTML('afterbegin' , todoList(todo))
    })
  }

  if (event.target.classList.contains('toggle-all')) {
    itemList.innerHTML = ''
    const result = Data.getAll()
    result.map(todo => {
      itemList.insertAdjacentHTML('afterbegin' , todoList(todo))
    })
  }

  return
})

document.addEventListener('dblclick' , function(event) {
  if (event.target.classList.contains('toggle-complete')) {
    Todo.toggleCompletedTodo(event.target.parentElement.getAttribute('item-id'))
  }
})

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
        const todo = this.getByIndex(i)
        result.push(todo)
      }
    }
    return result.sort((a,b) => a.id - b.id)
  },
  getComplete() {
    return this.getAll().filter(todo => todo.completed === true)
  },
  getOngoing() {
    return this.getAll().filter(todo => todo.completed === false)
  },
  store(id, todo) {
    localStorage.setItem(id , JSON.stringify(todo ,4,null)) // 4 , Null << Formating 
  },
  remove(id) {
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
}

// Load data from localStorage and render it to html
loadTodo()