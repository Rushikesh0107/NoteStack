import React from 'react'
import Avatar from '@mui/material/Avatar';
import { useState } from 'react';
import {useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import { register } from '../../../services/Operations/authAPI';

import { setsignupData } from '../../../slices/authSlice';

const SignUpForm = () => {

    const [formData, setFormData] = useState({
        fullname: '',
        email: '',
        username: '',
        password: '',
    })
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {fullname, email, username, password} = formData;

    const handleOnChange = (e)  => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }))
        //console.log(formData);
    }

      const handleOnSubmit =(e) => {
        e.preventDefault();

        const { fullname, email, username, password } = formData;

        dispatch(register(username, password, email, fullname, navigate));

        dispatch(setsignupData({ fullname, email, username, password}));
        //console.log(formData);
      }
    
  return (
    <>
    <div className='w-full flex flex-col items-center h-screen justify-center'>
        <div>
            <h1 className='font-bold text-2xl '>
                Sign Up Form
            </h1>
        </div>

        <div>
            <form 
            className='px-8 pt-6 pb-8 mb-4 w-96 flex-col flex gap-4'
            onSubmit={handleOnSubmit}
            >

                <input 
                type="text" 
                required
                name='fullname'
                value={fullname}
                placeholder='Full Name'
                onChange={handleOnChange}
                className='p-3 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full'
                />

                <input 
                type="email" 
                name='email'
                required
                value={email}
                onChange={handleOnChange}
                placeholder='Email'
                className='p-3 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full'
                />

                <input 
                type="text" 
                required
                name='username'
                value={username}
                onChange={handleOnChange}
                className='p-3 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full'
                placeholder='Username'
                />
                <input 
                type="password" 
                required
                name='password'
                value={password}
                onChange={handleOnChange}
                placeholder='Password'
                className='p-3 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full'
                />

                <input 
                type="submit" 
                className='px-6 py-3 bg-black text-white font-semibold rounded-md focus:outline-none focus:shadow-outline-blue'
                />
            </form>
        </div>
    </div>
    </>
  )
}

export default SignUpForm