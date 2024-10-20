import {toast} from "react-hot-toast"

import { apiConnector } from "../apiConnector";
import { adminEndppoints } from "../apis";
import { setLoading, setToken } from "../../slices/authSlice";
import { setUser } from "../../slices/profileSlice";

const {
    ADMIN_LOGIN_API 
} = adminEndppoints

//==================== Admin Login ====================

export const adminLogin = (username, password, navigate) => {
    return async (dispatch) => {
        const toastId = toast.loading('Logging in...');
        dispatch(setLoading(true));

        try {
            const response = await apiConnector(
                "POST",
                ADMIN_LOGIN_API,
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
            navigate("/admin-dashboard");
            window.location.reload();
        } catch (error) {
            toast.error(error.response?.data?.message)
            console.log("LOGIN_API ERROR", error);
        } 
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}