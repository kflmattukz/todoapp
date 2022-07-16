export default function todoInfo({all,ongoing,completed}) {
  return `<div class='flex w-4/5 sm:w-3/5 md:w-2/5 lg:w-2/6 mx-auto mt-5 bg-white border border-gray-300 rounded-md shadow-md p-2 items-center justify-between font-semibold text-gray-500 text-sm'>
            <div>All : ${all}</div>
            <div>Ongoing : ${ongoing}</div>
            <div>Complete : ${completed}</div>
          </div>`
}