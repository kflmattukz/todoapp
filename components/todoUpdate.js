export default function todoUpdate ({id , task , completed}) {
  return `<div class='update'>
            <form id='update-form' class="flex group-focus:outline outline-green-700/25 items-center border border-green-600/50 rounded-lg shadow-lg overflow-hidden">
              <input id='update-id' value=${id} hidden />
              <input id='update-complete' value=${completed} hidden />
              <input class="w-full group px-3 text-lg text-gray-500 outline-none" id='update-task' type='text' name='update-todo' value='${task}' />
              <button class='update px-5 py-2 bg-green-500 font-semibold text-gray-50 tracking-wide lowercase'>&#10004;</button>  
            </form>
          </div>`
}