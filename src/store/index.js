// store.js
import { configureStore } from '@reduxjs/toolkit';
import displayReducer from './displaySlice';
import nearByAirportsReducer from './nearByAirportsSlice';

const store = configureStore({
    reducer: {
        display: displayReducer,
        nearByAirports: nearByAirportsReducer
    },
});

export default store;
