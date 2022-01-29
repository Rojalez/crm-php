import React, {useEffect, useState} from "react";
import useToken from "../../hooks/useToken";
import LoadingIndicator from "../LoadingIndicator/LoadingIndicator";

export default function Profile() {
    const { token } = useToken();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [createdAt, setCreatedAt] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        let unmounted = false;
        async function fetchData() {
          setIsLoading(true);
          try {
            const response = await fetch('http://localhost:8000/api/v1/user', {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
              }
            });
            const json = await response.json();
            setName(json.name);
            setEmail(json.email);
            setCreatedAt(json.created_at);
            } catch (error) {
            console.log("Ошибка:", error);
          }
          if (!unmounted) {
          setIsLoading(false);
        }};
        fetchData();
        return () => { unmounted = true };
    }, [token]);

    return(
        <div className="dark:bg-grey-800 bg-grey-200 mx-auto w-1/4 my-6 shadow rounded">
            <div className="w-full py-8 flex justify-center items-center">
            {isLoading ? (
                <LoadingIndicator/>
                    ) : (
                <div className="flex flex-col dark:text-white text-grey-800 items-center">
                    <div className="h-24 w-24 rounded-full mb-3">
                        <img className="h-full w-full object-cover rounded-full shadow" src="https://dh-ui.s3.amazonaws.com/assets/photo-1570211776045-af3a51026f4a.jfif" alt='profile' />
                    </div>
                    <p className="mb-2 text-lg font-bold">{name}</p>
                    <p className="mb-6 text-sm">{email}</p>
                    <p className="mb-6 text-sm">{createdAt}</p>
                </div>
                )}
            </div>
        </div>
    )
}