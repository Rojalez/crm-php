import React from 'react';

function TrackerHeader({ plan, onChange, onAdd }) {

    return (
    <div className='rounded-md p-4 max-h-full dark:bg-grey-800 transition-all duration-150 bg-grey-300 my-4'>
        <form className='flex flex-row justify-between gap-x-4'>
            <input 
                required
                placeholder='Введите название плана'
                className='rounded-sm h-5 w-1/2 dark:placeholder-white placeholder-grey-800 dark:focus:placeholder-grey-500 transition dark:text-white text-black duration-150 dark:focus:bg-opacity-70 dark:focus:text-grey-300 dark:bg-grey-900 bg-grey-100 outline-none border-0 p-2'
                type="text" 
                value={plan} 
                onChange={onChange}
                 />
            <button 
                className='rounded-sm dark:text-white transition-all duration-150 dark:bg-grey-900 dark:focus:bg-opacity-70 outline-none border-0 w-min py-2 px-4 justify-self-end' 
                type='button' 
                onClick={() => [onAdd()]}>
                Добавить
            </button>
        </form>
    </div>
    
    );

}
export default TrackerHeader;