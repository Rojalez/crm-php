import React, {useState, useEffect} from "react";
import TaskForm from "../components/Task/TaskForm";
import TaskList from "../components/Task/TaskList"
import {getAll, delById, postTask} from "../API/TaskService";
import { getUsers } from "../API/UserService";
import { useFetching } from "../hooks/useFetching";
import 'react-loading-skeleton/dist/skeleton.css'
import useHeader from '../hooks/useHeader';

const Tasks = () => {
    const [tasks, setTasks] = useState([]);
    const [users, setUsers] = useState([]);
    const header = useHeader()
    const [fetchTasks, isTasksLoading] = useFetching(async () => {
        const response = await getAll(header)
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
        fetchTasks(tasks)
        fetchUsers(users)
    }, [])


    return (
        <div className="p-4">
            <TaskForm users={users} fetchTask={fetchTask} isPostTaskLoading={isPostTaskLoading} isUsersLoading={isUsersLoading}/>
            <TaskList users={users} delTask={delTask} isDeleting={isDeleting} isTasksLoading={isTasksLoading} tasks={tasks}/>
        </div>
    )
}

export default Tasks;