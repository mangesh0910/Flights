import React, { useEffect, useState } from "react";
import axios from "axios";

const GetUsersConfig = () => {
    const [countryCode, setCountryCode] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        // Function to get user's current location
        const getLocation = async () => {
            if ("geolocation" in navigator) {
                navigator.geolocation.getCurrentPosition(
                    async (position) => {
                        const { latitude, longitude } = position.coords;
                        console.log('latitude::', latitude)
                        console.log('longitude::', longitude)
                        console.log('position::', position)
                        try {
                            // Use a reverse geocoding service to get country code
                            const response = await axios.get(
                                `https://geocode.xyz/${latitude},${longitude}?geoit=json`
                            );

                            if (response.data && response.data.prov) {
                                console.log('Geolocation Data:', response.data)
                                setCountryCode(response.data.prov); // Country code from response
                            } else {
                                setError("Unable to fetch country code");
                            }
                        } catch (err) {
                            setError("Error fetching geolocation data");
                        }
                    },
                    (err) => {
                        setError("Error getting location: " + err.message);
                    }
                );
            } else {
                setError("Geolocation is not supported by this browser.");
            }
        };

        getLocation();
    }, []);

    return (
        <div>
            {error && <p>Error: {error}</p>}
            {countryCode ? <p>Country Code: {countryCode}</p> : <p>Loading...</p>}
        </div>
    );
};

export default GetUsersConfig;


// store.js
// import { configureStore } from '@reduxjs/toolkit';
// import userReducer from './userSlice';

// const store = configureStore({
//     reducer: {
//         user: userReducer, // Add user slice
//     },
// });

// export default store;


// // UserList.js
// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchUsers, clearUsers } from './userSlice';

// const UserList = () => {
//     const dispatch = useDispatch();
//     const { users, loading, error } = useSelector((state) => state.user);

//     useEffect(() => {
//         dispatch(fetchUsers()); // Fetch users on component mount

//         // Optional: Clear users when the component unmounts
//         return () => {
//             dispatch(clearUsers());
//         };
//     }, [dispatch]);

//     return (
//         <div>
//             <h1>User List</h1>
//             {loading && <p>Loading...</p>}
//             {error && <p style={{ color: 'red' }}>Error: {error}</p>}
//             <ul>
//                 {users.map((user) => (
//                     <li key={user.id}>
//                         {user.name} ({user.email})
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default UserList;
