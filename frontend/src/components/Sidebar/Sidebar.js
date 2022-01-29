import React from "react";
import { NavLink } from 'react-router-dom';
import '../Sidebar/Sidebar.css';
export default function Sidebar(){
    return (
        <div className='w-1/6 dark:bg-grey-800 transition-all duration-150 bg-grey-200 h-screen shadow-lg'>
            <div className='flex flex-col px-2 py-4 space-y-2'>
                <NavLink className="text-black dark:text-white no-underline transition-all duration-150 font-light p-3 dark:bg-grey-900 bg-grey-300 dark:shadow-none shadow-md rounded-md" to='/'>Трекер</NavLink>
                <NavLink className="text-black dark:text-white no-underline transition-all duration-150 font-light p-3 dark:bg-grey-900 bg-grey-300 dark:shadow-none shadow-md rounded-md" to='/plan'>Планы</NavLink>
                <NavLink className="text-black dark:text-white no-underline transition-all duration-150 font-light p-3 dark:bg-grey-900 bg-grey-300 dark:shadow-none shadow-md rounded-md" to='/profile'>Профиль</NavLink>
            </div>
        </div>
    )
}