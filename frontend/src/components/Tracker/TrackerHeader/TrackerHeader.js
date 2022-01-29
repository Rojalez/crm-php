import React from 'react';
import Timer from '../../Timer/Timer';

function TrackerHeader({ task, onChange, onAdd }) {

    return (
    <div className='rounded-md p-4 border max-h-full dark:bg-grey-800 transition-all duration-150 bg-grey-300 my-4'>
        <form className='flex flex-row justify-between gap-x-4'>
            <input 
                required
                placeholder='Введите название задачи'
                className='rounded-sm h-5 w-1/2 dark:placeholder-white placeholder-grey-800 dark:focus:placeholder-grey-500 transition dark:text-white text-black duration-150 dark:focus:bg-opacity-70 dark:focus:text-grey-300 dark:bg-grey-900 bg-grey-100 outline-none border-0 p-2'
                type="text" 
                value={task} 
                onChange={onChange} />
            <Timer onAdd={onAdd}/>
        </form>
    </div>
    
    );

}
export default TrackerHeader;