import React from "react";
import TaskItem from "./TaskItem";
const TaskList = ({tasks, delTask, isDeleting, users}) => {
    return (  
        <div className="inline-block py-2 min-w-full">
            <div className="overflow-hidden shadow-md sm:rounded-lg">
                <table className="min-w-full">
                    <thead className="bg-gray-100 dark:bg-gray-700">
                        <tr>
                            <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                Задача
                            </th>
                            <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                Исполнитель
                            </th>
                            <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                Статус
                            </th>
                            <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                Дата создания
                            </th>
                            <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                Дата изменения
                            </th>
                            <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-right text-gray-700 uppercase dark:text-gray-400">
                                {isDeleting
                                    ? <i className="fas fa-spinner-third animate-spin px-6 text-right dark:text-white"></i>
                                    : <span className="">Действие</span>
                                }
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                    {tasks?.map((task) => ( 
                        <TaskItem delTask={delTask} key={task.id} users={users} task={task}/>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default TaskList;