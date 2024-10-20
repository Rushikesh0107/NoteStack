import { apiConnector } from "../apiConnector";
import { pyqEndpoints } from "../apis";
import {toast} from "react-hot-toast"
import { setPyqs } from "../../slices/pyqSlice";

const {
    GET_PYQ_API
} = pyqEndpoints

export const getPYQ = (subject) => {
    return async (dispatch) => {
        const toastId = toast.loading("Getting PYQs...");
        try{
            const response = await apiConnector(
                "POST",
                GET_PYQ_API,
                {
                    subject
                },
                {
                    authorization: `Bearer ${localStorage.getItem("accessToken")}`
                }
            )

            console.log("PYQS", response.data.data);

            if(!response.data.data){
                throw new Error(response.data.message)
            }

            dispatch(setPyqs(response.data.data));
        }catch(e) {
            console.log("PYQ_API ERROR", e.message);
        }
        toast.dismiss(toastId);
    }
}