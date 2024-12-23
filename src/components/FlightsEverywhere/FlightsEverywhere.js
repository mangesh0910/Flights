import React, { useRef, useState } from 'react'
import Map from '../Map/Map'
import { Button, Card, CardContent, CardMedia, Grid, IconButton, Typography } from '@mui/material'
import { Box } from '@mui/system'
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import useApi from '../../Api/useApi'
import { FlightEverywhereData } from '../../Data/FlightEverywhereData'
import { useSelector } from 'react-redux';
import { googleMapApiKey } from '../../Api/keys';

const FlightsEverywhere = () => {
    const NearByAirportsData = useSelector((state) => state.nearByAirports.nearByAirportsData)
    const [selectedFromEverywhere, setSelectedFromEverywhere] = useState(null);
    const [coordinatesArray, setCoordinatesArray] = useState([]);

    const scrollContainerRef = useRef(null);
    const { callApi, error, loading } = useApi();

    const scroll = (direction) => {
        const container = scrollContainerRef.current;
        const scrollAmount = 300;
        if (direction === "left") {
            container.scrollLeft -= scrollAmount;
        } else {
            container.scrollLeft += scrollAmount;
        }
    };

    const searchFlightEverywhere = async () => {
        try {
            const params = {
                originEntityId: selectedFromEverywhere != null ? selectedFromEverywhere.navigation.entityId : NearByAirportsData.current.navigation.entityId,
            }
            const response = await callApi('/searchFlightEverywhere', 'GET', null, params);
        } catch (error) {
            console.error(error);
        }
    }

    const onHandleClick = (na) => {
        setSelectedFromEverywhere(na)
        fetchCoordinates()
    }

    const fetchCoordinates = async () => {
        try {

            const updatedFlightsData = FlightEverywhereData.results.map((fl) => fl.content.location.name)

            updatedFlightsData.map(async (fl) => {
                const response = await fetch(
                    `https://maps.googleapis.com/maps/api/geocode/json?address=${fl}&key=${googleMapApiKey}`
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch coordinates");
                }

                const data = await response.json();


                if (data.status === "OK") {
                    const location = data.results[0].geometry.location;
                    setCoordinatesArray((prevArray) => [...prevArray, location])
                } else {
                    console.log("Location not found");
                }
            })
        } catch (err) {
            console.log(err.message);
        }

    };

    return (
        <Grid container sx={{ width: '100%', display: 'flex', justifyContent: 'center', mx: { xs: 2, sm: 0 } }}>
            <Grid item container sm={8} sx={{ my: 2, display: 'flex', display: 'flex', justifyContent: 'flex-start' }}>
                <Grid item sm={12} sx={{}}>
                    <Typography variant='h6' sx={{ py: 1, color: '#202124', fontSize: 20 }}>Find cheap flights from {selectedFromEverywhere != null ? selectedFromEverywhere.presentation.title : NearByAirportsData.current.presentation.title} to anywhere</Typography>
                </Grid>
                <Grid item sm={12} sx={{ display: 'flex', gap: 2, my: 1, overflow: 'auto', }}>
                    {
                        NearByAirportsData.nearby.map((na) => (<Button onClick={() => onHandleClick(na)} variant='outlined' sx={{ border: '1px solid lightgray', borderRadius: 4, color: 'black', fontSize: 14, textTransform: 'none' }}>{na.presentation.title}</Button>))
                    }
                </Grid>
                <Grid item sm={12} sx={{ gap: 2, my: 2 }}>
                    <Map locations={coordinatesArray} />
                </Grid>
                <Grid item sm={12} sx={{ gap: 2, my: 2, position: "relative", display: "flex", alignItems: "center", width: "100%" }}>
                    {selectedFromEverywhere != null && <IconButton
                        onClick={() => scroll("left")}
                        sx={{
                            position: "absolute",
                            left: 0,
                            zIndex: 1,
                            backgroundColor: 'white',
                            color: "white",
                            "&:hover": { backgroundColor: "white" },
                        }}
                    >
                        <ArrowBackIosIcon sx={{ color: 'lightgray' }} />
                    </IconButton>}

                    <Box sx={{ position: "relative", display: "flex", alignItems: "center", width: "100%" }}>
                        <Box
                            ref={scrollContainerRef}
                            sx={{
                                display: "flex",
                                overflowX: "auto",
                                scrollBehavior: "smooth",
                                "&::-webkit-scrollbar": { display: "none" }, // Hide scrollbar for a cleaner look
                            }}
                        >
                            {selectedFromEverywhere != null && FlightEverywhereData.results.map((fl, index) => (
                                <Card
                                    key={index}
                                    sx={{
                                        minWidth: 100,
                                        margin: "10px",
                                        flexShrink: 0,
                                        position: "relative", // Required for positioning the label
                                        boxShadow: 3,
                                        borderRadius: 4
                                    }}
                                >
                                    <CardMedia
                                        component="img"
                                        height={'100'}
                                        image={fl.content.image.url}
                                        alt={`Image ${index + 1}`}
                                    />
                                    <CardContent>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <Typography sx={{ color: '#202124', fontSize: 16, fontWeight: 500 }}>{fl.content.location.name}</Typography>
                                            <Typography sx={{ color: '#202124', fontSize: 16, fontWeight: 500 }}>{fl.content.flightQuotes.cheapest.price}</Typography>
                                        </Box>
                                    </CardContent>
                                </Card>
                            ))
                            }
                        </Box>

                    </Box>
                    {selectedFromEverywhere != null && <IconButton
                        onClick={() => scroll("right")}
                        sx={{
                            position: "absolute",
                            right: 0,
                            zIndex: 1,
                            backgroundColor: 'white',
                            color: "white",
                            "&:hover": { backgroundColor: "white" },
                        }}
                    >
                        <ArrowForwardIosIcon sx={{ color: 'lightgray' }} />
                    </IconButton>}
                </Grid>
            </Grid>
        </Grid >
    )
}

export default FlightsEverywhere