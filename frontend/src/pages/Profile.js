import React, {useState, useEffect} from "react";
import { getUserById } from "../API/UserService";
import { useFetching } from "../hooks/useFetching";
import useHeader from "../hooks/useHeader";
const Profile = () => {
    const [user, setUser] = useState([])
    const header = useHeader()
    const id = user.id
    const [subscribe, setSubscribe] = useState(false)
    const [fetchTaskById, isLoading, error] = useFetching(async () => {
        const response = await getUserById(header, id);
        setUser(response.data);
        console.log(response.data)
    });

    useEffect(() => {
        setSubscribe(true)
        fetchTaskById(user.id)
        return () => setSubscribe(false)
    }, [])

    if(!subscribe) {
        return null;
    }
    
    return (
        <div className="my-20">
         

                  <div>
                    {/* {user.name} */}
                  </div>
        

        </div>
        
    )
}

export default Profile;