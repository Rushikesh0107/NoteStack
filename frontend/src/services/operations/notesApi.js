import {toast} from "react-hot-toast"

import { apiConnector } from "../apiConnector";
import { notesEndpoints } from "../apis";
import { setNotes } from "../../slices/notesSlice";

const {GET_NOTES_API} = notesEndpoints

export const getNotes = (subject) => {
    return async (dispatch) => {
        try {
            const repsonse = await apiConnector(
                "POST",
                GET_NOTES_API,
                {
                    subject
                },
                {
                    authorization: `Bearer ${localStorage.getItem("accessToken")}`
                }
            )
            console.log("NOTES", repsonse.data.data);
            dispatch(setNotes(repsonse.data.data));
        }catch(e) {
            console.log("NOTES_API ERROR", e);
        }
    }
}

export const getNumberOfNotes = () => {
    return async (dispatch) => {
        try {
            const response = await apiConnector(
                "GET",
                GET_NOTES_API,
                null,
                {
                    authorization: `Bearer ${localStorage.getItem("accessToken")}`
                }
            )
            console.log("NUMBER_OF_NOTES", response.data.data);
        }catch (e) {
            console.log("NUMBER_OF_NOTES_API ERROR", e);
        }
    }
}