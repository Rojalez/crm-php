import React from "react";
import useDarkMode from "../../hooks/useDarkMode";

export default function ToggleTheme() {
    const [colorTheme, setTheme] = useDarkMode()

    return (
        <button className="bg-transparent border-0 cursor-pointer" onClick={()=> setTheme(colorTheme)}>
            {colorTheme === 'light' ? 
                <i className="fas fa-sun text-lg text-yellow-400-accent"></i> 
                : 
                <i className="fas fa-moon text-lg text-indigo-900 "></i> 
            }
        </button>
    )
}