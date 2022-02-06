import React, {useState} from 'react';
import TrackerList from '../TrackerList/TrackerList';
import TrackerHeader from '../TrackerHeader/TrackerHeader';
import {v4 as uuidv4} from 'uuid';
import { useLocalStorage } from '../../../hooks/useLocalStorage';

export default function TrackerContent() {
    const [tracker_list, setList] = useLocalStorage('tracker_list', []);
    const [task, setTask] = useState('');
    const [time] = useState("00:00:00");
    
    function handleChange(event) {
        setTask(event.target.value);
      }
    
    function handleAdd() {
        const newList = tracker_list.concat({ task, id: uuidv4() });
        setList(newList);
        setTask('');
    }

    function handleRemove(id) {
        const newList = tracker_list.filter((item) => item.id !== id);
        setList(newList);
    }



    return(
        <div>
            <TrackerHeader
                task={task}
                onChange={handleChange}
                onAdd={handleAdd}
            />
            <TrackerList 
                tracker_list={tracker_list}
                onRemove={handleRemove}
                time={time}
            />
      
        </div>
    )
 
}
