import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Header from '../Header/Header';

async function registerUser(data) {
    return fetch('http://localhost:8000/api/v1/register', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(data => data.json())
}

export default function Register({setToken}) {
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
   
    
    const handleSubmit = async e => {
        e.preventDefault();
        const token = await registerUser({
          name,
          email,
          password
        });
        setToken(token);
      }

      return(
        <>
        <Header/>
        <div className="flex flex-col items-center justify-center">     
            <form className="bg-grey-800 shadow flex flex-col justify-center items-center rounded lg:w-1/3 md:w-1/2 w-full p-10 mt-16" onSubmit={handleSubmit}>
            
                <div className="w-full">
                    <p className="text-2xl font-extrabold leading-6 text-grey-100">
                        Регистрация
                    </p>
                    <p className="text-sm mt-4 font-medium leading-none text-grey-300">
                        Уже есть аккаунт?{" "}
                        <span role="link" aria-label="Sign up here" className="text-sm font-medium leading-none underline text-gray-800 cursor-pointer">
                            {" "}
                            <Link className="text-white no-underline" to="/login">Вход</Link>
                        </span>
                    </p>
                </div>
                <div className='mt-6 w-full'>
                    <span className="text-sm font-medium leading-none text-white">Имя</span>
                    <input required type="text" onChange={e => setName(e.target.value)} className="bg-grey-700  placeholder-grey-300 text-white border-0 rounded focus:outline-none text-xs font-medium leading-none text-gray-800 py-3 px-2 w-full mt-2" />
                </div>
                <div className='mt-6 w-full'>
                    <span className="text-sm font-medium leading-none text-white">Почта</span>
                    <input required type="email" autoComplete='username' onChange={e => setEmail(e.target.value)} className="bg-grey-700  placeholder-grey-300 text-white border-0 rounded focus:outline-none text-xs font-medium leading-none text-gray-800 py-3 px-2 w-full mt-2" />
                </div>
                <div className="mt-6 w-full">
                    <span className="text-sm font-medium leading-none text-white">Пароль</span>
                    <input required type="password" autoComplete="current-password" onChange={e => setPassword(e.target.value)} className="bg-grey-700  placeholder-grey-300 text-white border-0 rounded focus:outline-none text-xs font-medium leading-none text-gray-800 py-3 px-2 w-full mt-2" />
                </div>
                <div className="mt-8 w-full">
                    <button
                        type='submit'
                        className="text-sm w-full font-semibold leading-none text-white focus:outline-none bg-grey-900 border-0 rounded py-4">
                        Регистрация
                    </button>
                </div>
            </form>
        </div>
        </>
    )
}

Register.propTypes = {
    setToken: PropTypes.func.isRequired
  }
