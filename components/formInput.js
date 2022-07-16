export default function formInput () {
    return `<div class='form-input w-4/5 sm:w-3/5 md:w-2/5 lg:w-2/6 mx-auto'>
              <form id='todo-form' class="flex group-focus:outline outline-sky-700/25 items-center border border-sky-600/50 rounded-lg shadow-lg overflow-hidden">
                  <input  class="group py-1 px-3 flex-grow text-lg text-gray-500 outline-none" id='todo-input' type='text' name='item' placeholder='Enter new Item here...' />
                  <button class="px-6 py-2 bg-sky-500 font-semibold text-gray-50 tracking-wide lowercase">&#10009;</button>
              </form>
              </div>
  
            <div id='item-list' class="flex flex-col gap-1 mt-5 w-4/5 sm:w-3/5 md:w-2/5 lg:w-2/6 mx-auto"></div>`
}