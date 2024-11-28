import React, { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { Box } from "@mui/material";

const Map = ({ locations }) => {
    const containerStyle = {
        width: "100%",
        height: "400px",
    };

    const apiKey = "AIzaSyBiSd5t17ek3QNPz11MqKrWbl_2ebOdxgI"; // Replace with your Google Maps API key

    const defaultCenter = { lat: 21.4735329, lng: 55.975413 };
    const [mapCenter, setMapCenter] = useState(defaultCenter);

    useEffect(() => {
        // Update the center of the map when locations are updated
        if (locations && locations.length > 0) {
            setMapCenter(locations[0]); // Center map on the first marker
        }
    }, [locations]);

    return (
        <Box sx={{ width: "100%" }}>
            <LoadScript googleMapsApiKey={apiKey}>
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={mapCenter}
                    zoom={2} // Adjust zoom for better visibility
                >
                    {locations &&
                        locations.map((location, index) => (
                            <Marker
                                key={location.id || index} // Ensure unique key
                                position={location}
                            />
                        ))}
                </GoogleMap>
            </LoadScript>
        </Box>
    );
};

export default Map;
