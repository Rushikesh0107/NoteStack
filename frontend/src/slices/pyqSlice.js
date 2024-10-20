import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    pyqs: [],
    loading: false,
};

const pyqSlice = createSlice({
    name: 'pyq',
    initialState,
    reducers: {
        setPyqs(state, action) {
            state.pyqs = action.payload;
        },
        setPyqLoading(state, action) {
            state.loading = action.payload;
        }
    }
})

export const { setPyqs, setPyqLoading } = pyqSlice.actions;

export default pyqSlice.reducer;

