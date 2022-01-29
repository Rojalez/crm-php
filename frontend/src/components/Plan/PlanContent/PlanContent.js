import React, {useState} from 'react';
import PlanList from '../PlanList/PlanList';
import PlanHeader from '../PlanHeader/PlanHeader';
import {v4 as uuidv4} from 'uuid';
import { useLocalStorage } from '../../../hooks/useLocalStorage';

export default function PlanContent() {
    const [plan_list, setList] = useLocalStorage('plan_list', []);
    const [plan, setPlan] = useState('');
    function handleChange(event) {
        setPlan(event.target.value);
      }
    
    function handleAdd() {
        const newList = plan_list.concat({ plan, id: uuidv4() });
        setList(newList);
        setPlan('');
    }

    function handleRemove(id) {
        const newList = plan_list.filter((item) => item.id !== id);
        setList(newList);
    }



    return(
        <div>
            <PlanHeader
                plan={plan}
                onChange={handleChange}
                onAdd={handleAdd}
            />
            <PlanList 
                plan_list={plan_list}
                onRemove={handleRemove}
            />
      
        </div>
    )
 
}
