import {React, useEffect, useState} from "react";
import {useParams, useNavigate} from "react-router-dom";
import {useFetching} from "../hooks/useFetching";
import {getById, updateById} from "../API/TaskService";
import Moment from 'react-moment';
import MyButton from "../components/UI/button/MyButton";
import useHeader from '../hooks/useHeader';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import MyInput from "../components/UI/input/MyInput";
import MySelect from '../components/UI/select/MySelect'
import MyModal from "../components/UI/MyModal";
import Comment from "../components/Comment/Comment";
import { getUsers } from "../API/UserService";
const TaskPage = () => {
    const [users, setUsers] = useState([])
    const params = useParams()
    const [modal, setModal] = useState(false)
    const [subscribe, setSubscribe] = useState(false);
    const [task, setTask] = useState({
        title: '', 
        text: '',
        status: '',
        executor_id: '',
        user_id: '' 
    })
    const router = useNavigate()
    const header = useHeader()

    const [fetchUsers] = useFetching(async () => {
        const response = await getUsers(header)
        setUsers(response.data)
    })

    const [fetchTaskById, isLoading, error] = useFetching(async (id) => {
        const response = await getById(id, header);
        setTask(response.data);
    });

    const [updateTaskById] = useFetching(async (data) => {
        const response = await updateById(params.id, header, data )
        setTask([...task, response.data])
        fetchTaskById(params.id)
    })
    
    const changeTask = (e) => {
        e.preventDefault();
        const changedTask = {
            ...task
        };
        updateTaskById(changedTask)
        setModal(false)
    }
    useEffect(() => {
        setSubscribe(true)
        fetchTaskById(params.id)
        fetchUsers(users)
        return () => setSubscribe(false)
    }, [])

    if(!subscribe) {
        return null;
      }

    return (
        <>
        {error 
            ?   "Произошла ошибка:" + error
            :<>
                <div className="px-8 py-8">
                    <div className="bg-gray-50 dark:bg-gray-700 shadow-md relative w-full p-2 flex flex-col space-y-2 rounded-lg h-96">
                        <div className="absolute top-0 w-full bg-gray-200 dark:bg-gray-800 rounded-t-lg -mx-2 px-4 py-2 font-medium dark:text-white text-gray-700">
                        {isLoading 
                            ?   <Skeleton enableAnimation={false} width={600} className="dark:bg-gray-700 animate-pulse"/>
                            :   <div className="flex flex-row justify-between items-center">
                                    <div>
                                        <span className="text-gray-400 text-xs pr-2">
                                            {task.id}
                                        </span>
                                        {task.title}
                                    </div>
                                    <MyButton onClick={() => setModal(true)}>
                                            <i className="fal fa-pen-alt"></i>
                                    </MyButton>
                                </div>
                        }
                        </div>
                        <div className="py-12 px-2 text-sm dark:text-white">
                        {isLoading 
                            ? <Skeleton enableAnimation={false} count={5} className="dark:bg-gray-800 animate-pulse"/>
                            : <span>{task.text}</span>
                        }
                        </div>
                        <div className="absolute bottom-0 w-full flex flex-row justify-between items-center text-xs bg-gray-200 dark:bg-gray-800 rounded-b-lg px-3 py-3 -mx-2 dark:text-white text-gray-700">
                            <MyButton onClick={() => router('/')}><i className="fas fa-caret-left mr-2"></i>Назад</MyButton>
                            {isLoading
                                ?   <Skeleton enableAnimation={false} width={100} className="dark:bg-gray-700 animate-pulse"/>
                                :   <div className="flex flex-col space-y-2">
                                        <span>Создана: <Moment format="HH:mm:ss DD.MM.YY">{task.created_at}</Moment></span>
                                    </div>
                            }
                        </div>
                    </div>
                </div>
                <Comment params={params}/>
            </>
        }
        <MyModal visible={modal} title='Изменение данных таска' setVisible={setModal}>
            <MyInput value={task.title} type="text" onChange={e => setTask({...task, title: e.target.value})}/>
            <MyInput value={task.text} type="text" onChange={e => setTask({...task, text: e.target.value})}/>
            <MyInput value={task.status} type="text" onChange={e => setTask({...task, status: e.target.value})}/>
            <MySelect value={task.executor_id} onChange={e => setTask({...task, executor_id: e.target.value})} defaultValue="Выберите исполнителя">
                {users.map(user => (
                    <option key={user.id} value={user.id}>{user.name}</option>
                ))}
            </MySelect>
            <MyButton onClick={changeTask}>Готово</MyButton>
        </MyModal>
        </>
    )
}

export default TaskPage;