import {configureStore} from '@reduxjs/toolkit';
import authReducer from "../slices/authSlice.js"
import profileReducer from "../slices/profileSlice.js"
import departmentReducer from "../slices/departmentSlice.js"
import subjectReducer from "../slices/subjectSlice.js"
import notesReducer from "../slices/notesSlice.js"
import pyqReducer from "../slices/pyqSlice.js"

export const store = configureStore({
    reducer: {
        auth: authReducer,
        profile: profileReducer,
        department: departmentReducer,
        subject: subjectReducer,
        notes: notesReducer,
        pyq: pyqReducer,
    },
})