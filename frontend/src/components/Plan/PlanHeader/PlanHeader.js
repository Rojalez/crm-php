import React, {useEffect, useState} from 'react';
import useToken from '../../../hooks/useToken';


export default function PlanHeader() {
    const [users, setUsers] = useState([])
    const { token } = useToken();
    const [title, setTitle] = useState();
    const [text, setText] = useState();
    const [executor_id, setExecutor_id] = useState();
    
    // Запрос на создание таска
    async function createTask(data) {
        return fetch('http://localhost:8000/api/v1/time-tracker/task', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept' : 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            body: JSON.stringify(data)
            })
        .then(data => data.json())     
    }
    // Добавление таска
    const handleSubmit = e => {
        e.preventDefault();
        createTask({
            title,
            text,
            executor_id,
        });
      }
      
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
    return (
            <>
            <div className='rounded-md p-4 max-h-full dark:bg-grey-800 transition-all duration-150 bg-grey-300 my-4'>
                <form onSubmit={handleSubmit} className='flex flex-row justify-between gap-x-4'>
                    <input 
                        required
                        placeholder='Введите название плана'
                        className='rounded-sm h-5 w-1/2 dark:placeholder-white placeholder-grey-800 dark:focus:placeholder-grey-500 transition dark:text-white text-black duration-150 dark:focus:bg-opacity-70 dark:focus:text-grey-300 dark:bg-grey-900 bg-grey-100 outline-none border-0 p-2'
                        type="text" 
                        onChange={e => setTitle(e.target.value)} 
                        />
                        <input onChange={e => setText(e.target.value)}  placeholder='text' />
                        <select onChange={e => setExecutor_id(e.target.value)} >
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
            </>
    );

}