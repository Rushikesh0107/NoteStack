import { setSubjects } from '../../slices/subjectSlice';
import { apiConnector } from '../apiConnector';
import { subjectEndpoints } from '../apis';

const { GET_SUBJECTS_API } = subjectEndpoints;

export const getSubject = (departmentId, semester) => {
    return async (dispatch) => {
        console.log("inside getSubject");
        console.log(departmentId, semester);
        try {
            const response = await apiConnector(
                "POST",
                GET_SUBJECTS_API,
                {
                    departmentId,
                    semester
                },
                {
                    authorization: `Bearer ${localStorage.getItem("accessToken")}`
                }
            );

            // console.log("SUBJECTS", response.data.data);
            dispatch(setSubjects(response.data.data));
        } catch (error) {
            console.log("SUBJECT_API ERROR", error);
        }
    }
}

