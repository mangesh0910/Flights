// store.js
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';
import displayReducer from './displaySlice';
import nearByAirportsReducer from './nearByAirportsSlice';

const store = configureStore({
    reducer: {
        counter: counterReducer,
        display: displayReducer,
        nearByAirports: nearByAirportsReducer
    },
});

export default store;
