import React from 'react'

const Navbar = () => {
  return (
    <div>
        <nav className='flex justify-between bg-violet-500 text-white py-3'>
            <div className="log">
                <span className='font-bold text-xl mx-9'>iTask</span>
            </div>
            <ul className="flex gap-8 mx-9">
                <li className='cursor-pointer text-xl hover:font-bold transition-all duration-50'>Home</li>
                <li className='cursor-pointer text-xl hover:font-bold transition-all duration-50'>Your Tasks</li>

            </ul>
        </nav>
    </div>
  )
}

export default Navbar
