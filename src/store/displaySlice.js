import { createSlice } from '@reduxjs/toolkit';

const displaySlice = createSlice({
    name: 'display',
    initialState: {
        isBanerDisplay: true,
        isFlightsDisplay: false
    },
    reducers: {
        updateIsBanerDisplay: (state, action) => {
            state.isBanerDisplay = action.payload; // Use payload for dynamic values
        },
        updateIsFlightsDisplay: (state, action) => {
            state.isFlightsDisplay = action.payload; // Use payload for dynamic values
        },
    },
});

// Export actions for dispatching
export const { updateIsBanerDisplay, updateIsFlightsDisplay } = displaySlice.actions;

// Export reducer to use in store
export default displaySlice.reducer;
