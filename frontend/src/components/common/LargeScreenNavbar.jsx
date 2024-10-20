import React from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Avatar from '@mui/material/Avatar';
import { useSelector } from 'react-redux';

function LargeScreenNavbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const {user} = useSelector(state => state.profile)

  useEffect(() => {
    if (localStorage.getItem('accessToken')) {
      setIsLoggedIn(true)
    }
  })

  return (
    <div
    className='bg-black text-white w-full p-5 flex justify-between'
    >

    <Link to={"/"}>
      <h1
      className='text-4xl tracking-wider'
      >
        NoteStack
      </h1>
    </Link>


    <div
    className='flex items-center'
    >
      {isLoggedIn ? (
        <Avatar>
          {user?.username.charAt(0).toUpperCase()}
        </Avatar>
      ) : (
        <div
        className='flex gap-4 items-center'
        >
          <Link to={"/login"}>
          <div
        className='bg-white text-black font-bold pl-2 pr-2 pt-1 pb-1 flex items-center rounded-md'
        >
          LOGIN AS USER
        </div>
        </Link>

        <Link to={"/admin"}>
          <div
        className='bg-white text-black font-bold pl-2 pr-2 pt-1 pb-1 flex items-center rounded-md'
        >
          LOGIN AS ADMIN
        </div>
        </Link>
        </div>
      )}
    </div>
    </div>
  )
}

export default LargeScreenNavbar