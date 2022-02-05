import React from "react";
import { Link } from "react-router-dom";


 const PlanListItem = ({ item, token }) => {
    let classNamesItem = 'p-4 rounded flex flex-row space-x-4 justify-between items-center bg-grey-300 dark:shadow-none shadow-md transition-all duration-150 dark:bg-grey-900';
    let classNamesBtn = 'rounded-sm dark:bg-grey-800 mx-1 transition-all duration-150 p-2 border-0 text-white';

    // Запрос на удаление таска
    function handleRemove() {
        const deleteMethod = {
            method: 'DELETE',
            headers: {
             'Content-type': 'application/json; charset=UTF-8',
             'Authorization': 'Bearer ' + token,
            },
        }
        const url = 'http://localhost:8000/api/v1/time-tracker/task/'+ item.id;
        fetch(url, deleteMethod) 
        .then(response => response.json())
        .then(data => console.log(item.title + ' deleted ' + data))
        .catch(err => console.log(err))
        
    }
    
    
    return(
        <> 
        <div className={classNamesItem}>
           <Link className="text-white no-underline" to={"/plan/plan-page/" + item.id}>{item.title}</Link>
           <div>{item.executor.name}</div>
           <div>{item.author.name}</div>
           <div>{item.created_at}</div>
            <div className="flex space-x-2 items-center">
                <button className={classNamesBtn} type="button" onClick={() => handleRemove(item.id)}>
                    <i className="fal fa-trash text-red-400"></i>
                </button>
            </div>
        </div>
        </>
        
    )
}
export default PlanListItem;
