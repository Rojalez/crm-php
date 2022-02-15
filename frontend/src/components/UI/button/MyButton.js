import React from "react";

const MyButton = ({children, ...props}) => {
    return(
        <button {...props} className="text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:hover:bg-gray-800 dark:hover:border-gray-700 dark:focus:ring-gray-800">
            {children}
        </button>
    )
}

export default MyButton;