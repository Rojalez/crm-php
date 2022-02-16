import {React, useEffect, useState} from "react";
import {useParams, useNavigate} from "react-router-dom";
import {useFetching} from "../hooks/useFetching";
import {getById, updateById, getComments} from "../API/TaskService";
import Moment from 'react-moment';
import MyButton from "../components/UI/button/MyButton";
import useHeader from '../hooks/useHeader';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import MyInput from "../components/UI/input/MyInput";
import MySelect from '../components/UI/select/MySelect'
import MyModal from "../components/UI/MyModal";
import { useLocation } from 'react-router-dom'
import CommentForm from "../components/Comment/CommentForm";
const TaskPage = () => {
    const location = useLocation()
    const users = location.state
    const params = useParams()
    const [modal, setModal] = useState(false)
    const [task, setTask] = useState({
        title: '', 
        text: '',
        executor_id: '',
        user_id: '' 
    })
    const [comments, setComments] = useState([])

    const id = task.id
    const router = useNavigate()
    const header = useHeader()

    const [fetchTaskById, isLoading, error] = useFetching(async (id) => {
        const response = await getById(id, header);
        setTask(response.data);
    });

    const [updateTaskById] = useFetching(async (data) => {
        const response = await updateById(id, header, data )
        setTask([...task, response.data])
        fetchTaskById(id)
    })
    const [fetchComments, isCommentsLoading] = useFetching(async (id) => {
        const response = await getComments(id, header)
        setComments(response.data.comments)
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
        fetchTaskById(params.id)
        fetchComments(params.id)
    }, [])

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
                <CommentForm comments={comments} setComments={setComments}/>
                <div className="p-8">
                    <div className="p-2 w-max dark:text-gray-300 rounded-t-lg text-gray-800 text-xs bg-gray-200 dark:bg-gray-800">Комментарии</div>
                    <div className="bg-gray-200 dark:bg-gray-800 shadow-md w-full p-4 flex flex-col space-y-2 rounded-tl-none rounded-lg">
                        {isCommentsLoading
                            ? <Skeleton enableAnimation={false} count={5} className="h-full dark:bg-gray-700 animate-pulse"/>
                            : !comments.length 
                            ? <div className="dark:text-white text-xs text-gray-600 text-center py-16">Комментариев нет</div>
                            : comments.map(comment => (
                            <div key={comment.id} className="block relative p-2.5 w-full space-y-4 text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 rounded-lg dark:text-white">
                                <div className="flex flex-row text-xs space-x-2">
                                    <span>Имя пользователя {comment.user_id}</span>
                                    <span>{comment.created_at}</span>
                                </div>
                                <div className="text-sm w-10/12">
                                    {comment.comment}
                                </div>
                                <div className="absolute right-2 top-0">
                                        <MyButton><i className="fal fa-trash-alt"></i></MyButton>
                                        <MyButton><i className="fal fa-pen-alt"></i></MyButton>
                                </div>
                            </div>
                        ))}
                        
                        
                        
                    </div>         
                </div>
            </>
        }
        <MyModal visible={modal} setVisible={setModal}>
            <form className="p-6 space-y-6">
                <MyInput value={task.title} type="text" onChange={e => setTask({...task, title: e.target.value})}/>
                <MyInput value={task.text} type="text" onChange={e => setTask({...task, text: e.target.value})}/>
                <MySelect value={task.executor_id}  onChange={e => setTask({...task, executor_id: e.target.value})} defaultValue="Выберите исполнителя">
                    {users.map(user => (
                        <option key={user.id} value={user.id}>{user.name}</option>
                    ))}
                </MySelect>
                <MyButton onClick={changeTask}>Готово</MyButton>
            </form>
        </MyModal>
        </>
    )
}

export default TaskPage;