import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    departments: [],
    loading: false,
};

const departmentSlice = createSlice({
    name: "department",
    initialState,
    reducers: {
        setDepartments: (state, action) => {
            state.departments = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
    },
});

export const { setDepartments, setLoading } = departmentSlice.actions;

export default departmentSlice.reducer;