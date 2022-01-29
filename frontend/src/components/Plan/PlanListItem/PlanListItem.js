import React from "react";
// import { useLocalStorage } from "../../../hooks/useLocalStorage";

const PlanListItem = ({ item, onRemove}) => {
    let classNamesItem = 'p-4 rounded flex flex-row justify-between items-center bg-grey-300 dark:shadow-none shadow-md transition-all duration-150 dark:bg-grey-900';
    let classNamesBtn = 'rounded-sm dark:bg-grey-800 mx-1 transition-all duration-150 p-2 border-0 text-white'
    return(
        <li className={classNamesItem}>
           {item.plan}
            <div className="flex space-x-2 items-center">
                <button className={classNamesBtn} type="button" onClick={() => onRemove(item.id)}>
                    <i className="fal fa-trash text-red-400"></i>
                </button>
            </div>
        </li>
    )
}

export default PlanListItem;