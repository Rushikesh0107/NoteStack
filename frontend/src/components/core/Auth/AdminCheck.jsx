import React from 'react'
import {Navigate} from 'react-router-dom'
import { useSelector } from 'react-redux'
import {toast} from 'react-hot-toast'

const AdminCheck = ({children}) => {
    const user = localStorage.getItem("user");
    console.log(user);
    
    if(user && JSON.parse(user).role === "admin") return children   

    return <Navigate to="/admin" />
}

export default AdminCheck;