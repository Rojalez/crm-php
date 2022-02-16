import React, {useState, useEffect} from "react";
import { getUserById } from "../API/UserService";
import { useFetching } from "../hooks/useFetching";
import useHeader from "../hooks/useHeader";
const Profile = ({id}) => {
    const [user, setUser] = useState([])
    const header = useHeader()
    const [fetchTaskById, isLoading, error] = useFetching(async (id) => {
        const response = await getUserById(header, id);
        setUser(response.data);
        console.log(response.data)
    });

    useEffect(() => {
        fetchTaskById(user.id)
    }, [])
    return (
        <div className="my-20">
         

                  <div>
                    {/* {user.name} */}
                  </div>
        

        </div>
        
    )
}

export default Profile;