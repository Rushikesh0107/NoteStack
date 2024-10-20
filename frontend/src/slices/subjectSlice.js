import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  subjects: [],
  isLoading: false,
};

const subjectSlice = createSlice({
    name: 'subject',
    initialState,
    reducers: {
        setSubjects(state, action) {
        state.subjects = action.payload;
        },
        setSubjectLoading(state, action) {
        state.isLoading = action.payload;
        }
    }
});

export const { setSubjects, setSubjectLoading } = subjectSlice.actions;
export default subjectSlice.reducer;