import React from "react";

const MyModal = ({children, visible, setVisible, title}) => {
   
    let modalWrapper = 'hidden overflow-y-auto overflow-x-hidden fixed right-0 left-0 top-4 z-50 justify-center items-center md:h-full md:inset-0'

    if (visible) {
        modalWrapper = 'bg-opacity-90 backdrop-blur dark:bg-gray-800 flex overflow-y-auto overflow-x-hidden fixed right-0 left-0 top-4 z-50 justify-center items-center md:h-full md:inset-0'
    }
    return (
        <div onClick={() => setVisible(false)} className={modalWrapper}>
            <div  className="relative px-4 w-full max-w-2xl h-full md:h-auto">
                <div onClick={e => e.stopPropagation()} className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <div className="flex justify-between items-start p-5 rounded-t border-b dark:border-gray-600">
                        <h3 className="text-xl font-semibold text-gray-900 lg:text-2xl dark:text-white">
                        {title}
                        </h3>
                        <button onClick={() => setVisible(false)} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                        </button>
                    </div>
                    <form className="p-6 space-y-6">
                        {children}
                    </form>
                </div>
            </div>
        </div>
    )
}

export default MyModal;