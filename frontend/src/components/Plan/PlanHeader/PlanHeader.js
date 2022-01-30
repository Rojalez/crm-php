import React, {useEffect, useState} from 'react';
import useToken from '../../../hooks/useToken';
function TrackerHeader({ plan, onChange, onAdd }) {
    const [users, setUsers] = useState([])
    const { token } = useToken();
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
              console.log(response)

              const json = await response.json();
              setUsers(json.data);
              } catch (error) {
              console.log("Ошибка:", error);
            }
        };
        fetchData();
    }, [token]);


    return (
    <div className='rounded-md p-4 max-h-full dark:bg-grey-800 transition-all duration-150 bg-grey-300 my-4'>
        <form className='flex flex-row justify-between gap-x-4'>
            <input 
                required
                placeholder='Введите название плана'
                className='rounded-sm h-5 w-1/2 dark:placeholder-white placeholder-grey-800 dark:focus:placeholder-grey-500 transition dark:text-white text-black duration-150 dark:focus:bg-opacity-70 dark:focus:text-grey-300 dark:bg-grey-900 bg-grey-100 outline-none border-0 p-2'
                type="text" 
                value={plan} 
                onChange={onChange}
                 />
                <input placeholder='text' />
                <select>
                    {users.map((item) => (
                        <option key={item.id} value={item.id}>{item.name}</option>
                ))}
                </select>
            <button 
                className='rounded-sm dark:text-white transition-all duration-150 dark:bg-grey-900 dark:focus:bg-opacity-70 outline-none border-0 w-min py-2 px-4 justify-self-end' 
                type='button' 
                onClick={() => [onAdd()]}>
                Добавить
            </button>
        </form>
    </div>
    
    );

}
export default TrackerHeader;