import React from "react";
import {Route, Routes} from 'react-router-dom';
import useToken from "../hooks/useToken";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import Tasks from "../pages/Tasks";
import TaskPage from "../pages/TaskPage";
import Profile from "../pages/Profile";
const AppRouter = () => {
    const { token, setToken } = useToken();
    if(!token) {
      return(
      <>
      <Login setToken={setToken} />
      <Register setToken={setToken}/>
      </> 
      ) 
    }
    return (
        <Routes>
            <Route path='/tasks' element={<Tasks/>} exact={true}/>
            <Route path='/tasks/:id' element={<TaskPage/>} exact={true}/>
            <Route path='/profile' element={<Profile/>} exact={true}/>
        </Routes>
    )
}

export default AppRouter;