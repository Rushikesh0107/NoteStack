import React from 'react'
import {Navigate} from 'react-router-dom'
import { useSelector } from 'react-redux'
import {toast} from 'react-hot-toast'

const ProtectedRoutes = ({children}) => {
    const {token} = useSelector(state => state.auth)
    //console.log(token);

    //toast.error('Please login to continue')

    if(token) return children

    return <Navigate to="/login" />
}

export default ProtectedRoutes