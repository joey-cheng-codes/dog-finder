import React from "react";

interface ToggleArgs {
  toggle: string,
  setToggle: (toggle: string) => void,
}
const Toggle = ({ toggle, setToggle }: ToggleArgs) => {
  const handleToggle = () => {
    if (toggle == 'asc') {
      setToggle('desc')
    }
    else {
      setToggle('asc');
    }
  }
  return (
    <div>
      <label className="relative inline-flex items-center cursor-pointer" >
        <input type="checkbox" value="" className="sr-only peer" checked={toggle === 'asc'} onChange={handleToggle} />
        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"  >
        </div>
        <span className="ml-3 text-sm font-medium text-white-900 dark:text-white-300">Sort by {toggle === 'asc' ? 'Ascending' : 'Descending'}</span>
      </label>

    </div>
  )
}

export default Toggle;