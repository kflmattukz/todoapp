import formInput from "./components/formInput.js"
import todoList from "./components/todoList.js"
import todoUpdate from "./components/todoUpdate.js"
import todoInfo from "./components/todoInfo.js"

document.getElementById('root').insertAdjacentHTML('afterbegin' , formInput())

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
  Todo.addTodo({
    id: Date.now(),
    task: todoInput.value,
    completed: false
  })
  todoInput.value = ''
})


document.addEventListener('click' , function(event) {
  if (event.target.classList.contains('remove')) {
    Todo.removeTodo(event.target.parentElement.parentElement.getAttribute('item-id'))
  }

  if (event.target.classList.contains('edit')) {
    console.log(event.target.parentElement.parentElement)
    itemList.innerHTML = ''
    itemList.insertAdjacentHTML('afterbegin' , todoUpdate(Data.getById(event.target.parentElement.parentElement.getAttribute('item-id'))))
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
  
  Data.store(updateId , {
    id :updateId,
    task: updateTask,
    completed: updateComplete
  })
  loadTodo()
  todoInput.focus()
}