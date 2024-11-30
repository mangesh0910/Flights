import React, { useEffect, useRef } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { googleMapApiKey } from "../../Api/keys";

const Map = ({ locations }) => {
    const containerStyle = {
        width: "100%",
        height: "400px",
    };

    const markerRefs = useRef([]);

    useEffect(() => {
        if (markerRefs.current) {
            locations.forEach((location, index) => {
                if (markerRefs.current[index]) {
                    markerRefs.current[index].setPosition(location);
                }
            });
        }
    }, [locations]);

    return (
        <LoadScript googleMapsApiKey={googleMapApiKey}>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={{ lat: 21.4735329, lng: 55.975413 }}
                zoom={2}
            >
                {locations.map((location, index) => (
                    <Marker
                        key={index}
                        position={location}
                        onLoad={(marker) => (markerRefs.current[index] = marker)}
                    />
                ))}
            </GoogleMap>
        </LoadScript>
    );
};

export default Map;
