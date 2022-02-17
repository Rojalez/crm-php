import React from "react";
import {Route, Routes} from 'react-router-dom';
import useToken from "../hooks/useToken";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import { privateRoutes } from "../router/routes";

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
            {privateRoutes.map(route =>
                    <Route
                        path={route.path}
                        element={route.element}
                        exact={route.exact}
                        key={route.path}
                    />
            )}
        </Routes>
    )
}

export default AppRouter;