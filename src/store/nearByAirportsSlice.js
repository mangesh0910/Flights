import { createSlice } from '@reduxjs/toolkit';
import { NearByAirportsData } from '../Data/NearByAirportsData';


const nearByAirportsSlice = createSlice({
    name: 'nearByAirports',
    initialState: {
        nearByAirportsData: NearByAirportsData
    },
    reducers: {
        updateNearByAirports: (state, action) => {
            state.nearByAirportsData = action.payload; // Use payload for dynamic values
        },
    },
});

// Export actions for dispatching
export const { updateNearByAirports } = nearByAirportsSlice.actions;

// Export reducer to use in store
export default nearByAirportsSlice.reducer;
