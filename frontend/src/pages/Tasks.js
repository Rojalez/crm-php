import React, {useState, useEffect} from "react";
import TaskForm from "../components/Task/TaskForm";
import TaskList from "../components/Task/TaskList"
import {getAll, delById, postTask, getPage} from "../API/TaskService";
import { getUsers } from "../API/UserService";
import { useFetching } from "../hooks/useFetching";
import 'react-loading-skeleton/dist/skeleton.css'
import useHeader from '../hooks/useHeader';
import ReactPaginate from 'react-paginate'

const Tasks = () => {
    const [tasks, setTasks] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [users, setUsers] = useState([]);
    const [subscribe, setSubscribe] = useState(false);
    const header = useHeader()
    
    const [fetchTasks, isTasksLoading] = useFetching(async () => {
        const response = await getAll(header)
        const total = response.meta.last_page
        setPageCount(total);
        setTasks(response.data)
    })

    const [fetchPage, isPageLoading] = useFetching(async (currentPage) => {
        const response = await getPage(currentPage, header)
        setTasks(response.data)
    })

    const [fetchUsers, isUsersLoading] = useFetching(async () => {
        const response = await getUsers(header)
        setUsers(response.data)
    })

    const [fetchTask, isPostTaskLoading] = useFetching(async (data) => {
        const response = await postTask(data, header)
        setTasks([...tasks, response.data])
    })

    const [delTask, isDeleting] = useFetching(async (id) => {
        await delById(id, header)
        fetchTasks();
    })

    useEffect(() => {
        setSubscribe(true)
        fetchTasks(tasks)
        fetchUsers(users)
        return () => setSubscribe(false)
    }, [])

    if(!subscribe) {
        return null;
      }
    
    const handlePageClick = async (data) => {
        let currentPage = data.selected + 1;
        const tasksFormServer = await fetchPage(currentPage);
        setTasks(tasksFormServer)
        fetchPage(currentPage)
    }

    return (
        <div className="p-4">
            <TaskForm users={users} fetchTask={fetchTask} isPostTaskLoading={isPostTaskLoading} isUsersLoading={isUsersLoading}/>
            <TaskList users={users} delTask={delTask} isDeleting={isDeleting} isTasksLoading={isTasksLoading} isPageLoading={isPageLoading} tasks={tasks}/>
            <ReactPaginate
                previousLabel={"пред."}
                nextLabel={"след."}
                breakLabel={"..."}
                pageCount={pageCount}
                onPageChange={handlePageClick}
                containerClassName={'inline-flex -space-x-px'}
                pageLinkClassName={'py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'}
                previousLinkClassName={'py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'}
                nextLinkClassName={'py-2 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'}
                breakLinkClassName={'py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'}
                activeLinkClassName={'py-2 px-3 text-blue-600 bg-blue-50 border border-gray-300 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white'}

            />
        </div>
    )
}

export default Tasks;