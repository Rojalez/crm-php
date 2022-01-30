import React, {useEffect, useState} from 'react';
import useToken from '../../../hooks/useToken';
import PlanListItem from '../../Plan/PlanListItem/PlanListItem';



export default function PlanList({ onRemove }) {

    const [tasks, setTasks] = useState([])
    const { token } = useToken();
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
              console.log(json)
              setTasks(json.data);
              } catch (error) {
              console.log("Ошибка:", error);
            }
        };
        fetchData();
    }, [token]);

    // if (plan_list == '') {
    //     return <div className="dark:bg-grey-800 dark:text-white bg-grey-200 text-center p-20 transition-all duration-150 rounded-md min-h-full">Планов пока нет</div>
    // }
    return(
        <div className='dark:bg-grey-800 bg-grey-200 transition-all duration-150 rounded-md w-full min-h-full'>
            <ul className="flex flex-col space-y-2 dark:text-white transition-all duration-150 p-2 text-sm">
                {tasks.map((item) => (
                    <PlanListItem 
                        key={item.id} 
                        item={item} 
                        onRemove={onRemove}
                    />
                ))}
            </ul>
        </div>
    )
};
