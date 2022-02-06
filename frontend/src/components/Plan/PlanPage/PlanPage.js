import React, {useEffect, useState} from 'react';
import { useParams } from "react-router-dom";
import useToken from '../../../hooks/useToken';


export default function PlanPage() {
    const { token } = useToken();
    const [task, setTask] = useState([]);
    const { id } = useParams();
    useEffect(() => {
        async function fetchData() {
             try {
               const response = await fetch('http://localhost:8000/api/v1/time-tracker/task/' + id, {
                 method: 'GET',
                 headers: {
                   'Content-Type': 'application/json',
                   'Authorization': 'Bearer ' + token,
                 }
               });
               const json = await response.json();
               setTask(json.data);
               } catch (error) {
               console.log("Ошибка:", error);
             }
         };
         fetchData();
     }, [token, id]);

    return (
        <div>{task.text}</div>
    )
}