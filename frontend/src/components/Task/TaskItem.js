import React from "react";
import { Link } from "react-router-dom";
import Moment from 'react-moment';
const TaskItem = ({task, delTask}) => {
    return ( 
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
            <Link to={`/tasks/${task.id}`}><span className="text-gray-400 text-xs pr-2">{task.id}</span>{task.title}</Link>                
            </td>
            <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                {task.executor.name}
            </td>
            <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                {task.status}
            </td>
            <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                <Moment format="HH:mm:ss DD.MM.YY">{task.created_at}</Moment>
            </td>
            <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                <Moment format="HH:mm:ss DD.MM.YY">{task.updated_at}</Moment>
            </td>
            <td className="py-4 px-6 text-sm font-medium text-right whitespace-nowrap">
                <button onClick={()=> delTask(task.id)} className="text-blue-600 dark:text-blue-500 hover:underline">
                Удалить
                </button>
            </td>
        </tr>
    )
}

export default TaskItem;