import React, { useEffect, useRef } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";

const containerStyle = {
    width: "100%",
    height: "500px",
};

const center = {
    lat: 37.7749,
    lng: -122.4194,
};

// Array of locations to mark
// const locations = [
//     { id: 1, name: "Location 1", position: { lat: 37.7749, lng: -122.4194 } },
//     { id: 2, name: "Location 2", position: { lat: 37.7849, lng: -122.4094 } },
//     { id: 3, name: "Location 3", position: { lat: 37.7949, lng: -122.3994 } },
// ];

function MyMap({ locations }) {
    console.log('Locations fro  map:', locations)
    const mapRef = useRef(null);

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: "AIzaSyBiSd5t17ek3QNPz11MqKrWbl_2ebOdxgI", // Replace with your API key
        libraries: ["marker"], // Load the 'marker' library for AdvancedMarkerElement
    });

    useEffect(() => {
        if (isLoaded && mapRef.current) {
            const map = mapRef.current.state.map;

            // Add markers using AdvancedMarkerElement
            locations.forEach((location) => {
                if (window.google?.maps?.marker?.AdvancedMarkerElement) {
                    const marker = new window.google.maps.marker.AdvancedMarkerElement({
                        map,
                        position: location,
                        // title: location.name,
                    });

                    // Example: Add a click listener to the marker
                    marker.addListener("click", () => {
                        // alert(`Marker clicked: ${location.name}`);
                    });
                } else {
                    console.error("AdvancedMarkerElement is not available.");
                }
            });
        }
    }, [isLoaded]);

    if (!isLoaded) {
        return <div>Loading...</div>;
    }

    return (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={1}
            ref={mapRef}
        ></GoogleMap>
    );
}

export default MyMap;
