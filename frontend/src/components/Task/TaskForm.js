import React, {useState} from "react";
import MyButton from "../UI/button/MyButton";
import MyInput from "../UI/input/MyInput";
import MySelect from "../UI/select/MySelect";
const TaskForm = ({users, fetchTask, isPostTaskLoading}) => {

    const [task, setTask] = useState({
        title: '', 
        text: '', 
        executor_id: ''
    })

    const addNewTask = (e) => {
        e.preventDefault();
        const newTask = {
            ...task
        };
        fetchTask(newTask)
        setTask({
            title: '', 
            text: '', 
            executor_id: ''
        });
    }

    return (
        <form className="w-full p-4 dark:bg-gray-800 bg-gray-100 shadow rounded-lg items-center flex flex-row justify-between space-x-4">
             <>
                    <MyInput
                        type="text"
                        value={task.title}
                        onChange={e => setTask({...task, title: e.target.value})}
                        placeholder="Задача"/>
                    <MyInput 
                        type="text"
                        value={task.text}
                        onChange={e => setTask({...task, text: e.target.value})}
                        placeholder="Описание задачи"/>
                    <MySelect 
                        value={task.executor_id}
                        onChange={e => setTask({...task, executor_id: e.target.value})}
                        defaultValue="Исполнитель">
                        {users.map(user => (
                            <option key={user.id} value={user.id}>{user.name}</option>
                        ))}
                    </MySelect>
                    <MyButton onClick={addNewTask}>
                       {isPostTaskLoading
                        ? <i className="fas fa-spinner-third animate-spin"></i>
                        : "Создать"
                       } 
                    </MyButton>
                </>
            
        </form>
    )
}

export default TaskForm;