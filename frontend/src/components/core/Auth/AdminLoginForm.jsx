import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { adminLogin } from '../../../services/operations/adminApi';
import { useNavigate } from 'react-router-dom';

const AdminLoginForm = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const { username, password } = formData;

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
    //console.log(fromData);
  }

  const handleOnSubmit = (e) => {
    e.preventDefault();
    // console.log(formData);
    dispatch(adminLogin(username, password, navigate))
  }

  return (
    <div className='min-h-screen flex items-center justify-center flex-col'>
      <div className='mb-2'>
        <h1 className='md:text-3xl text-2xl font-bold mb-4'>
          ADMIN LOGIN
        </h1>
      </div>

      <form 
      className='px-8 pt-6 pb-8 mb-4 w-96 flex-col flex gap-4'
      onSubmit={handleOnSubmit}
      >
        <div className='flex justify-center'>
          <input
            type="text"
            required
            name='username'
            value={username}
            placeholder='Username'
            className='p-3 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full'
            onChange={handleOnChange}
          />
        </div>

        <div className='flex justify-center'>
          <input
            type="password"
            required
            name='password'
            value={password}
            placeholder='Password'
            className='p-3 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full'
            onChange={handleOnChange}
          />
        </div>

        <div className='flex justify-center'>
          <button
            type="submit"
            className='px-5 py-2 tracking-wider bg-black text-white font-semibold rounded-md focus:outline-none focus:shadow-outline-blue'
          >
            LOGIN
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminLoginForm;
