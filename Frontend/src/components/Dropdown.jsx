import React from 'react'

 function Dropdown({name,options}) {
  return (
    <div>
      <div class="flex w-full justify-center items-center h-screen dark:bg-gray-900">

<div class="dropdown inline-block relative">
  <button class="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold py-2 px-4 rounded inline-flex items-center">
    <span class="mr-1">Dropdown</span>
    <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/> </svg>
  </button>
  <ul class="dropdown-menu absolute hidden text-gray-700 dark:text-gray-300 pt-1">
    <li class=""><a class="rounded-t bg-gray-200 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-700 py-2 px-4 block whitespace-no-wrap"
        href="#">One</a></li>
    <li class=""><a class="bg-gray-200 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-700 py-2 px-4 block whitespace-no-wrap" href="#">Two</a></li>
    <li class=""><a class="rounded-b bg-gray-200 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-700 py-2 px-4 block whitespace-no-wrap" href="#">Three
        is the magic number</a></li>
  </ul>
</div>

</div>
    </div>
  )
}
export default Dropdown