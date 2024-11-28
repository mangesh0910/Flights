// userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the async thunk
export const fetchUsers = createAsyncThunk('user/fetchUsers', async (_, thunkAPI) => {
    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users'); // Example API
        return response.data; // Return data to be used by the fulfilled case
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data); // Handle errors
    }
});

// Create the user slice
const userSlice = createSlice({
    name: 'user',
    initialState: {
        users: [],
        loading: false,
        error: null,
    },
    reducers: {
        clearUsers: (state) => {
            state.users = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload; // Update the users state with the API response
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Failed to fetch users';
            });
    },
});

// Export actions and reducer
export const { clearUsers } = userSlice.actions;
export default userSlice.reducer;
