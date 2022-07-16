export default function todoList ({id ,task ,completed}) {
  return `<div class='item flex items-center border border-gray-200 bg-white rounded-md shadow-md overflow-hidden' item-id=${id} >
            <div class='w-full toggle-complete ml-3 font-medium text-gray-500 truncate ${completed ? 'line-through' : ''} '>${task}</div>
            <div class='action flex'>
              <button class='px-4 py-2 remove bg-red-600 hover:bg-red-700 duration-300 font-semibold text-gray-200 hover:text-gray-50 tracking-wide'>&#10006</button>
              <button class='px-3 py-2 edit bg-green-600 hover:bg-green-700 duration-300 font-semibold text-gray-200 hover:text-gray-50 tracking-wide'>&#9998;</button>
            </div>
          </div>`
}