import React, { useState } from "react";
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function Login({ setToken }) {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    async function loginUser(data) {
        return fetch('http://localhost:8000/api/v1/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
            })
        .then(data => data.json())
    }

    const handleSubmit = async e => {
        e.preventDefault();
        const token = await loginUser({
          email,
          password
        });
        setToken(token);
      }

    return(
        <>
        <div className="flex flex-col items-center justify-center">     
        <form className="bg-grey-800 shadow flex flex-col justify-center items-center rounded lg:w-1/3 md:w-1/2 w-full p-10 mt-16" onSubmit={handleSubmit}>
            <div className="w-full">
                <p className="text-2xl font-extrabold leading-6 text-grey-100">
                    Вход
                </p>
                <p className="text-sm mt-4 font-medium leading-none text-grey-300">
                    У вас нет аккаунта?{" "}
                    <span role="link" aria-label="Sign up here" className="text-sm font-medium leading-none underline  cursor-pointer">
                        {" "}
                        <Link className="text-white no-underline" to="/register">Регистрация</Link>
                    </span>
                </p>
            </div>
            <div className='mt-6 w-full'>
                <span className="text-sm font-medium leading-none text-white">Почта</span>
                <input required type="email" onChange={e => setEmail(e.target.value)} className="bg-grey-700 placeholder-grey-300 text-white border-0 rounded focus:outline-none text-xs font-medium leading-none  py-3 px-2 w-full mt-2" />
            </div>
            <div className="mt-6 w-full">
                <span className="text-sm font-medium leading-none text-white">Пароль</span>
                <input required type="password" autoComplete="password" onChange={e => setPassword(e.target.value)} className="bg-grey-700  placeholder-grey-300 text-white border-0 rounded focus:outline-none text-xs font-medium leading-none  py-3 px-2 w-full mt-2" />
            </div>
            <div className="mt-8 w-full">
                <button
                    type='submit'
                    className="text-sm w-full font-semibold leading-none text-white focus:outline-none bg-grey-900 border-0 rounded py-4">
                    Войти
                </button>
            </div>
        </form>
        </div>
        </>
    )
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
  }