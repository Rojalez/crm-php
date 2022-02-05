import React, {useEffect, useState} from 'react';
import useToken from '../../../hooks/useToken';
import PlanListItem from '../../Plan/PlanListItem/PlanListItem';
import LoadingIndicator from '../../LoadingIndicator/LoadingIndicator'

export default function PlanList() {
    const [tasks, setTasks] = useState([])
    const { token } = useToken();
    const [users, setUsers] = useState([])
    const [title, setTitle] = useState();
    const [text, setText] = useState();
    const [executor_id, setExecutor_id] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);



    

 // Запрос на получение исполнителей
      useEffect(() => {
        async function fetchData() {
             try {
               const response = await fetch('http://localhost:8000/api/v1/time-tracker/user', {
                 method: 'GET',
                 headers: {
                   'Content-Type': 'application/json',
                   'Authorization': 'Bearer ' + token,
                 }
               });
               const json = await response.json();
               setUsers(json.data);
               } catch (error) {
               console.log("Ошибка:", error);
             }
         };
         fetchData();
     }, [token]);

    // Запрос на получение тасков
    useEffect(() => {
       async function fetchData() {
            try {
              const response = await fetch('http://localhost:8000/api/v1/time-tracker/task', {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer ' + token,
                }
              });
              const json = await response.json();
              setTasks(json.data);
              } catch (error) {
                setError(error.message);
                setTasks(null);
                }finally {
                setLoading(false);
                }  
        };
        fetchData();
    }, [token]);

    // Запрос на создание таска

    async function createTask(data) {
        console.log('task created', data)
        fetch('http://localhost:8000/api/v1/time-tracker/task', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept' : 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            body: JSON.stringify(data)
            })
        // .then(data  =>  data.json())  
        
    }


      // Добавление таска
        const handleAdd = e => {
            e.preventDefault();
            createTask ({
                title: title,
                text: text,
                executor_id: executor_id,
            });
            setTitle('')
            setText('')
            setExecutor_id('')
        }
    
    return(
        <>
                    <div className='dark:bg-grey-800 bg-grey-200 transition-all duration-150 rounded-md w-full mb-5'>
        <div className='rounded-md p-4 max-h-full dark:bg-grey-800 transition-all duration-150 bg-grey-300 my-4'>
                <form onSubmit={handleAdd} className='flex flex-row justify-between gap-x-4'>
                    <input 
                        required
                        placeholder='Введите название плана'
                        className='rounded-sm h-5 w-1/3 dark:placeholder-white placeholder-grey-800 dark:focus:placeholder-grey-500 transition dark:text-white text-black duration-150 dark:focus:bg-opacity-70 dark:focus:text-grey-300 dark:bg-grey-900 bg-grey-100 outline-none border-0 p-2'
                        type="text" 
                        onChange={e => setTitle(e.target.value)} 
                        />
                        <input 
                            className='rounded-sm h-5 w-1/2 dark:placeholder-white placeholder-grey-800 dark:focus:placeholder-grey-500 transition dark:text-white text-black duration-150 dark:focus:bg-opacity-70 dark:focus:text-grey-300 dark:bg-grey-900 bg-grey-100 outline-none border-0 p-2'
                            onChange={e => setText(e.target.value)}  
                            placeholder='text' />
                        <select 
                            className='rounded-sm w-1/6 dark:placeholder-white placeholder-grey-800 dark:focus:placeholder-grey-500 transition dark:text-white text-black duration-150 dark:focus:bg-opacity-70 dark:focus:text-grey-300 dark:bg-grey-900 bg-grey-100 outline-none border-0 p-2'
                            onChange={e => setExecutor_id(e.target.value)} >
                            {users.map((item) => (
                                <option key={item.id} value={item.id}>{item.name}</option>
                        ))}
                        </select>
                    <button
                        
                        className='rounded-sm dark:text-white transition-all duration-150 dark:bg-grey-900 dark:focus:bg-opacity-70 outline-none border-0 w-min py-2 px-4 justify-self-end' 
                        >
                        Добавить
                    </button>
                </form>
            </div> 
          
        </div>
        <div className="flex flex-col space-y-2 dark:text-white transition-all duration-150 p-2 text-sm">
            {loading && <div className='flex justify-center bg-grey-900 rounded py-4 w-full'><LoadingIndicator/></div>}
            {error && (
                <div>{`Ошибка загрузки задач - ${error}`}</div>
            )}
                {tasks.map((item) => (
                    <PlanListItem 
                        key={item.id} 
                        item={item} 
                        token={token}
                    />
                ))}
            </div>
        </>
    )
};
