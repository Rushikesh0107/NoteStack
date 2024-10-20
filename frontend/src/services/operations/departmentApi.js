import {toast} from "react-hot-toast"

import { apiConnector } from "../apiConnector";
import { departmentEndpoints } from "../apis";
import { setDepartments } from "../../slices/departmentSlice";

const {GET_DEPARTMENTS_API} = departmentEndpoints

export const getDepartments = () => {
    return async (dispatch) => {
        try{
            const response  = await apiConnector(
                "GET",
                GET_DEPARTMENTS_API,
                null,
                {
                    authorization: `Bearer ${localStorage.getItem("accessToken")}`
                }
            )

            // console.log("DEPARTMENTS", response.data.data);

            if(!response.data.success){
                throw new Error(response.data.message);
            }

            dispatch(setDepartments(response.data.data));
        }catch(e) {
            console.log("DEPARTMENT_API ERROR", e);
        }
    }
}

