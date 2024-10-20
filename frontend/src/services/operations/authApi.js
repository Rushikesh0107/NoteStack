import {toast} from 'react-hot-toast'

import {setLoading, setToken} from "../../slices/authSlice.js"
import {apiConnector} from "../apiConnector.js"
import {authEndpoints} from "../apis.js"
import {setUser} from "../../slices/profileSlice.js"

const {
    LOGIN_API,
    REGISTER_API,
    LOGOUT_API,
} = authEndpoints;

//====================Login====================

export const login = (username, password, navigate)  => {
    console.log(username, password);
    return async (dispatch) => {
        const toastId = toast.loading('Logging in...');
        dispatch(setLoading(true));

        try {
            const response = await apiConnector(
                "POST",
                LOGIN_API,
                {username, password},
            )

            const user = response.data.data.user;

            if(!response.data.success){
                throw new Error(response.data.message);
            }
            
            
            dispatch(setToken(response.data.data.accessToken));
            
            dispatch(setUser(user));
            
            
            localStorage.setItem("user", JSON.stringify({ ...response.data.data.user}));
            localStorage.setItem("accessToken", response.data.data?.accessToken);
            
            toast.success("Login Successfull");
            navigate("/")
            window.location.reload();
        } catch (error) {
            toast.error(error.response?.data?.message)
            console.log("LOGIN_API ERROR", error);
        } 
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}

//====================Logout====================
export const logout = (token, navigate) => {
    return async (dispatch) => {
        const toastId = toast.loading('Logging out...');
        dispatch(setLoading(true));

        try {
            const response = await apiConnector(
                "GET",
                LOGOUT_API,
                null,
                {
                    authorization: `Bearer ${token}`,
                }
            )

            console.log(response.data.data);
            console.log("hello");

            if(!response.data.success){
                throw new Error(response.data.message);
            }

            
            localStorage.removeItem("user");
            localStorage.removeItem("accessToken");
            dispatch(setToken(null));
            toast.success("Logout Successfull");
            navigate("/")
            window.location.reload();
        } catch (error) {
            toast.error(error.response?.data?.message)
            console.log("LOGOUT_API ERROR", error);
        } 
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}


//====================Register====================

export const register = (username, password, email, fullname, navigate) => {
    return async (dispatch) => {

        const toastId = toast.loading('Registering...');
        dispatch(setLoading(true));


        try{
            const response = await apiConnector(
                "POST",
                REGISTER_API,
                {
                    fullname,
                    username,
                    email,
                    password,
                },
                {
                    "Content-Type": "multipart/form-data",
                }
            )

            if(!response.data.success){
                throw new Error(response.data.message);
            }

            const user = response.data.data.CreatedUser;

            console.log(user);

            dispatch(setToken(response.data.accessToken));

            //console.log(response.data.data.accessToken);

            dispatch(setUser(user));

            localStorage.setItem("user", JSON.stringify({ ...response.data.data.createdUser}));
            localStorage.setItem("accessToken", response.data.data?.accessToken);

            dispatch(setLoading(false));
            toast.dismiss(toastId);
            toast.success("Register Successfull");
            navigate("/address")
            window.location.reload();
        } catch (error){
            toast.error(error.response?.data?.message)
            console.log("REGISTER_API ERROR", error);
        }
        toast.dismiss(toastId);
    }
}