import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    notes: [],
    isLoading: false,
    };


const notesSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
        setNotes(state, action) {
        state.notes = action.payload;
        },
        setNotesLoading(state, action) {
        state.isLoading = action.payload;
        }
    }
});

export const { setNotes, setNotesLoading } = notesSlice.actions;

export default notesSlice.reducer;