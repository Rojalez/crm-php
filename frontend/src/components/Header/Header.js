import React from "react";
import ToggleTheme from '../ToggleTheme/ToggleTheme';

const Header = () => {
    return(
        <div className='w-full dark:bg-grey-800 transition-all duration-150 bg-grey-200'>
            <div className='flex flex-row justify-between items-center px-5'>
                <div className='dark:text-white text-black transition-all duration-150 font-bold py-2 text-2xl'>timeTracker</div> 
                <div className='flex flex-row space-x-2 items-center'>  
                    {/* <button
                        className='h-min w-min border-0 bg-transparent'>
                        <i className="fal fa-grip-lines text-white text-2xl"></i>
                    </button> */}
                    <ToggleTheme/>
                </div>
            </div>
        </div>
    )
}

export default Header;