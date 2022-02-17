import React from "react";

const MyTextarea = ({ children, ...props}) => {
    return (
        <>
            <textarea {...props} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 rounded-lg border-0 focus:border-none focus:ring-0 focus:outline-none dark:placeholder-gray-400 dark:text-white">
                {children}
            </textarea>
        </>
    )
}
export default MyTextarea;