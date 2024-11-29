import { Box, Card, CardMedia, Typography, Grid } from '@mui/material';
import React, { useRef } from "react";
import IconButton from "@mui/material/IconButton";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const images = [
    { label: 'Goa', url: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTYT2VKCwlDw65sddS7B_27Sg05sqT5RYswU-h2iMbI0z2poobUdODCOA1UhWrk3mZlJ8q0DKwBC-cdOFy4CMdxeoCkV4gqsrpcC6Rsrw" },
    { label: 'Belgavi', url: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQjdu8JecJbCFKQjbeHJSHItYzLqsUIgeUCID85olxYcYa7AVzPSgO-DZTPr0zBtrxpHn8fn8M_nV5hIHQsr93RVAvjUrZQkDpAlhOsxw" },
    { label: 'Perth', url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRA7wtisrK6YzjkdVIratkrD6WMOfLldjK6UZuzVJYIXwFYDU8uDet-mLe0SMhTvTFNB2rC7C4qE3hfJhw7EsHODu_EUeWGssGGsEV44A" },
    { label: 'Brisbane', url: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTdDUv0akI_Euc2uLJkhfY7MQ8QHwa5KuihehIEMZ10q1gfvL02U6zpKkehWbLWPWQGnqbZ_OOJLD8NeGHjM7Yd_cyytTBU7IXNLhca-A" },
    { label: 'Melborne', url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0jgXTA5sQSBac6ErGyOAXMm68uob4MthciKHev3mouMQuK3ejtX8GgNLv2Uh_Qpav52Y2WRIoTY9AreA0oLgY8yqJxnQY7VVjAdnPsg" },
    { label: 'Riyadh', url: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcR--IYDnisCXiS58qMrbc1Aut75k1ltNQMNkNyx2uyJnL_1pBBpx6etQkxlyNY7oHPHqed2a4sDlg5jMb558aaSFr1N01m9hH90ZydiVw" },
    { label: 'Dammam', url: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcT8RvprbARdk89wiFlbqmRxgM_yN0z_PG5WjXTvQ4oCh5yoDL36v-GUE63LbvvZ3cDN1JDvqNlQDp_9XScitGloxcjSLPL313d-G7AJqQ" },
    { label: 'Sydney', url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRb5nZuTdd_zmteUL0TaXic4msIHIDlHRk7Jl7wrM7ih3f1bYEW4WD381vq90J3gCKuamfsxIjgCbk2W7RO1RbPYd9_wS1vLmc_UiWAgA" },

];

const PopularDestinations = () => {
    const scrollContainerRef = useRef(null);

    const scroll = (direction) => {
        const container = scrollContainerRef.current;
        const scrollAmount = 300; // Adjust this value based on your desired scroll distance
        if (direction === "left") {
            container.scrollLeft -= scrollAmount;
        } else {
            container.scrollLeft += scrollAmount;
        }
    };
    return (
        <Grid container sx={{ width: '100%', display: 'flex', justifyContent: 'center', mx: { xs: 2, sm: 0 } }}>
            <Grid item container sm={8} sx={{ my: 2 }}>
                <Typography variant='h6' sx={{ py: 1, color: '#202124', fontSize: 20 }}>Popular destinations from Kolhapur</Typography>
                <Box sx={{ position: "relative", display: "flex", alignItems: "center", width: "100%" }}>
                    {/* Left Arrow */}
                    <IconButton
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
                    </IconButton>

                    {/* Scrollable Container */}
                    <Box
                        ref={scrollContainerRef}
                        sx={{
                            display: "flex",
                            overflowX: "auto",
                            scrollBehavior: "smooth",
                            "&::-webkit-scrollbar": { display: "none" }, // Hide scrollbar for a cleaner look
                        }}
                    >
                        {images.map((item, index) => (
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
                                {/* Image */}
                                <CardMedia
                                    component="img"
                                    height="100"
                                    image={item.url}
                                    alt={`Image ${index + 1}`}
                                />

                                {/* Label */}
                                <Box
                                    sx={{
                                        position: "absolute",
                                        bottom: 0,
                                        left: 20,
                                        color: "white",
                                        padding: "5px 10px",
                                    }}
                                >
                                    <Typography variant='body1' sx={{ fontWeight: 600 }}>{item.label}</Typography>
                                </Box>
                            </Card>
                        ))}
                    </Box>

                    {/* Right Arrow */}
                    <IconButton
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
                    </IconButton>
                </Box>
            </Grid>
        </Grid>
    );
};

export default PopularDestinations;
