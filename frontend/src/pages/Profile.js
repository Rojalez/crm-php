import React, {useState, useEffect} from "react";
import { getUser } from "../API/UserService";
import { useFetching } from "../hooks/useFetching";
import useHeader from "../hooks/useHeader";
import Moment from 'react-moment'
const Profile = () => {
    const [user, setUser] = useState([])
    const header = useHeader()
    const [subscribe, setSubscribe] = useState(false)
    const [fetchUser, isLoading, error] = useFetching(async () => {
        const response = await getUser(header);
        setUser(response);
    });
    useEffect(() => {
        setSubscribe(true)
        fetchUser(user)
        return () => setSubscribe(false)
    }, [])

    if(!subscribe) {
        return null;
    }
    return (
        <>
            <div className="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                <div className="flex flex-col items-center p-10">
                    <h3 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{user.name}</h3>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{user.email}</span>
                    <Moment format="HH:mm:ss DD.MM.YY" className="text-sm text-gray-500 dark:text-gray-400">{user.created_at}</Moment>
                    {user.quesddue_tasks}
                </div>
            </div>
            <div>

            </div>
        </>
        
    )
}

export default Profile;