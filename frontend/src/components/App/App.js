import Sidebar from '../Sidebar/Sidebar';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Tracker from '../Tracker/Tracker';
import '../../assets/fontawesome/css/all.min.css';
import Register from '../Auth/Register';
import Login from '../Auth/Login';
import useToken from '../../hooks/useToken';
import Header from '../Header/Header';
import Profile from '../Profile/Profile';
import Plan from '../Plan/Plan';
// import "react-widgets/styles.css";
// import DropdownList from "react-widgets/DropdownList";
export default function App() {
  const { token, setToken } = useToken();


  if(!token) {
    return(
    <div>
    <Login setToken={setToken} />
    <Register setToken={setToken}/>
    </div> 
    ) 
  }

  return ( 
    <>
      <div className='dark:bg-grey-700 bg-white transition-all duration-150'>
        <Header/>
        <div className='w-full h-full flex flex-row justify-between'>      
              <Sidebar/>
            <div className='w-full px-6 '>
            {/* <DropdownList /> */}
            
                <Routes>
                    <Route path="/" element={<Tracker/>} />
                    <Route path="/plan" element={<Plan/>} />
                    <Route path="/profile" element={<Profile/>} />
                </Routes>
            </div>
        </div>  
      </div>
    </>
  )
}



