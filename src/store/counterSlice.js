// counterSlice.js
import { createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
    name: 'counter',
    initialState: {
        value: 0,
    },
    reducers: {
        increment: (state) => {
            state.value += 1; // Directly modifying state (Immer handles immutability)
        },
        decrement: (state) => {
            state.value -= 1;
        },
        reset: (state) => {
            state.value = 0;
        },
        incrementByAmount: (state, action) => {
            state.value += action.payload; // Use payload for dynamic values
        },
    },
});

// Export actions for dispatching
export const { increment, decrement, reset, incrementByAmount } = counterSlice.actions;

// Export reducer to use in store
export default counterSlice.reducer;
