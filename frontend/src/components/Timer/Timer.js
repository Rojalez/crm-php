import React from 'react';

import useTimer from '../../hooks/useTimer';
import { formatTime } from '../../utils/timerIndex';
const Timer = ({onAdd}) => {
  const { timer, isActive, isPaused, handleStart, handlePause, handleResume, handleReset } = useTimer(0)
  const classTimerButtons = 'rounded-sm h-full dark:text-white transition-all duration-150 ease-in-out dark:bg-grey-900 dark:focus:bg-opacity-70 outline-none border-0 w-min py-2 px-4 justify-self-end';
  return (
      <div className='flex flex-row space-x-4'>
        <input 
          value={formatTime(timer)}
          disabled
          className='rounded-sm h-5 w-20 text-center text-sm dark:placeholder-white dark:focus:placeholder-grey-500 transition-all dark:text-white duration-150 ease-in-out dark:focus:bg-opacity-70 dark:focus:text-grey-300 dark:bg-grey-900 bg-grey-100 outline-none border-0 p-2'/>
        <div className='flex flex-row space-x-2'>
          {
            !isActive && !isPaused ?
              <button 
                type='button'
                className={classTimerButtons} 
                onClick={handleStart}>
                  <i className="fal fa-play-circle"></i>
              </button>
              : (
                isPaused ? 
                  <button 
                    type='button'
                    className={classTimerButtons} 
                    onClick={handlePause}>
                    <i className="fal fa-pause-circle"></i>
                  </button> :

                 <div className='flex flex-row space-x-2'>
                 <button 
                    type='button'
                    className={classTimerButtons} 
                    onClick={handleResume}>
                    <i className="fal fa-play-circle"></i>
                  </button>
                  <button 
                    type='button'
                    className={classTimerButtons} 
                    onClick={handleReset} 
                    disabled={!isActive}>
                      <div className='flex flex-row space-x-2 items-center'>
                        <i className="fal fa-minus-circle text-red-400-accent"></i>
                      
                      </div>
                    </button>
                    <button 
                        className='rounded-sm dark:text-white transition-all duration-150 dark:bg-grey-900 dark:focus:bg-opacity-70 outline-none border-0 w-min py-2 px-4 justify-self-end'
                        type="button" 
                        onClick={() => [onAdd(), handleReset()]}
                         >
                        Готово
                    </button>
                 </div>
              )
              
          }
        </div>

      </div>
  );
}

export default Timer;