import { Card, Grid, Typography, Box, Stack, Button, MenuItem, Checkbox, ListItemText, FormControl, Select, OutlinedInput, CircularProgress } from '@mui/material';
import React, { useEffect } from 'react';
//Accordion
import Accordion, { accordionClasses } from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails, {
    accordionDetailsClasses,
} from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Fade from '@mui/material/Fade';
import SvgIcon from "@mui/material/SvgIcon";
import SwapVertIcon from '@mui/icons-material/SwapVert';

//Timeline
import Timeline from '@mui/lab/Timeline';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import { TimelineOppositeContent } from '@mui/lab';
// import flightsData from '../../Data/TestData1';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import { updateIsBanerDisplay } from '../../store/displaySlice';
import FilterComponent from '../FilterComponent.js/FilterComponent';
import EastIcon from '@mui/icons-material/East';
import MultipleStopIcon from '@mui/icons-material/MultipleStop';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import DoneIcon from '@mui/icons-material/Done';
import useApi from '../../Api/useApi';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
            fontSize: 14,
            fontWeight: 400,
            color: '#70757a'
        },
    },
};

const SortBy = [
    { label: 'Top flights', value: 'best' },
    { label: 'Price', value: 'price_high' },
    { label: 'Departure time', value: 'outbound_take_off_time' },
    { label: 'Arrival time', value: 'outbound_landing_time' },
    { label: 'Duration', value: 'fastest' },
];

const DisplayFlights = ({ searchParams }) => {
    const [expanded, setExpanded] = React.useState(false);
    const [flightsData, setFlightsData] = React.useState(null);
    // const [loading, setLoading] = React.useState(false);
    const [sortedLoading, setSortedLoading] = React.useState(false);
    const dispatch = useDispatch(); // Hook to dispatch actions


    const { callApi, error, loading } = useApi();

    const [sortBy, setSortBy] = React.useState(SortBy[0].value);

    const handleSortByChange = (event) => {
        const { target: { value } } = event;
        setSortBy(value);
        searchFlights(value)
    };

    const handleExpansion = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const searchFlights = async (sortType) => {
        try {
            console.log('searchParams:', searchParams)
            const finalParams = sortType ? { ...searchParams, sortBy: sortType } : searchParams;
            const response = await callApi('/searchFlights', 'GET', null, finalParams);
            console.log('Search Flights Data74::', response.data)
            setFlightsData(response.data)
        } catch (error) {
            console.error(error);
        } finally {
        }
    }
    // useEffect(() => {
    //     dispatch(updateIsBanerDisplay(false))

    //     return () => dispatch(updateIsBanerDisplay(true))
    // }, [])

    // console.log('Flights Data111::', flightsData.itineraries)

    useEffect(() => {
        searchFlights()
    }, [])


    return (
        <Grid container sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            {!loading ? <Grid item container sm={8} sx={{ height: '80%', my: 2 }}>
                <Box sx={{ width: '100%' }}><FilterComponent /></Box>
                <Typography variant='h6' sx={{ py: 1 }}>Top Flights</Typography>
                <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant='h6' sx={{ pb: 2, color: '#70757a', fontSize: 12 }}>Prices include required taxes + fees for 1 adult. Optional charges and bag fees may apply. Passenger assistance info.</Typography>
                    <FormControl sx={{ m: 1, width: 'auto' }}>
                        <Select
                            labelId="demo-multiple-checkbox-label"
                            id="demo-multiple-checkbox"
                            value={sortBy}
                            IconComponent={SwapVertIcon}
                            onChange={handleSortByChange}
                            input={<OutlinedInput label="Tag" />}
                            renderValue={(selected) => {
                                if (!selected) {
                                    return "Select an option"; // Placeholder
                                }
                                const selectedOption = SortBy.find((option) => option.value === selected);

                                return (
                                    <div style={{ display: "flex", alignItems: "center" }}>
                                        <span style={{ marginLeft: 8, color: '#1A73E8', fontSize: 14, fontWeight: 500 }}>Sort By</span>
                                    </div>
                                );
                            }}
                            MenuProps={MenuProps}
                            sx={{
                                '& .MuiFilledInput-input': {
                                    backgroundColor: 'white'
                                },
                                '& .MuiSelect-select': {
                                    fontSize: 18,
                                    fontWeight: 400,
                                    color: '#70757a',
                                    ':hover': {
                                        backgroundColor: 'whitesmoke'
                                    },
                                },
                            }}
                        >
                            {SortBy.map((name) => {
                                return (
                                    <MenuItem key={name.value} value={name.value}>
                                        <Checkbox icon={<Box sx={{ width: 18, height: 18 }} />} checkedIcon={<DoneIcon />} checked={sortBy.includes(name.value)} />
                                        <ListItemText primary={name.label} />
                                    </MenuItem>
                                )
                            })}


                        </Select>
                    </FormControl>
                </Box>
                <Box sx={{ width: '100%' }}>
                    <div>
                        {
                            !sortedLoading && flightsData != null && flightsData.itineraries.map((itr) => (
                                <Accordion
                                    key={itr.id}
                                    expanded={expanded === itr.id}
                                    onChange={handleExpansion(itr.id)}
                                    slots={{ transition: Fade }}
                                    slotProps={{ transition: { timeout: 400 } }}
                                    sx={[

                                        expanded === itr.id
                                            ? {
                                                border: "1px solid lightgray", borderRadius: "8px",
                                                [`& .${accordionClasses.region}`]: {
                                                    height: 'auto',
                                                },
                                                [`& .${accordionDetailsClasses.root}`]: {
                                                    display: 'block',
                                                },
                                            }
                                            : {
                                                border: "1px solid lightgray", borderRadius: "8px",
                                                [`& .${accordionClasses.region}`]: {
                                                    height: 0,
                                                },
                                                [`& .${accordionDetailsClasses.root}`]: {
                                                    display: 'none',
                                                },
                                            },
                                    ]}
                                >

                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1-content"
                                        id="panel1-header"
                                    >
                                        {itr.legs.map((leg, index) =>
                                            index == 0 && (!expanded ? <Stack direction={'row'} sx={{ py: 2, width: '100%' }}>
                                                <Grid container sx={{ width: '100%' }}>
                                                    <Grid item sm={1} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                        <Box
                                                            component="img"
                                                            sx={{
                                                                width: 35, // Set desired width
                                                                height: 35, // Set desired height (optional)
                                                            }}
                                                            alt="Example Image"
                                                            // src="https://www.gstatic.com/flights/airline_logos/70px/6E.png"
                                                            src={leg.carriers.marketing[0].logoUrl}
                                                        />
                                                    </Grid>
                                                    <Grid item sm={2} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                        <Box>
                                                            <Typography sx={{ fontSize: 16, fontWeight: '900', color: '#202124' }}>{moment(leg.departure).format("hh:mm A")} - {moment(leg.arrival).format("hh:mm A")} </Typography>
                                                            <Typography sx={{ fontSize: 12, color: '#70757a' }}>{leg.carriers.marketing[0].name} </Typography>
                                                        </Box>
                                                    </Grid>
                                                    <Grid item sm={3} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                        <Box>
                                                            <Typography sx={{ fontSize: 16, color: '#202124' }}>{`${Math.floor(leg.durationInMinutes / 60)} hr ${leg.durationInMinutes % 60} min`}</Typography>
                                                            <Typography sx={{ fontSize: 12, color: '#70757a' }}>{leg.origin.displayCode}-{leg.destination.displayCode}</Typography>
                                                        </Box>
                                                    </Grid>
                                                    <Grid item sm={2} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                        <Box>
                                                            <Typography sx={{ fontSize: 16, color: '#202124' }}>{leg.segments.length - 1} {leg.segments.length > 3 ? 'stops' : 'stop'} </Typography>
                                                            <Typography sx={{ fontSize: 12, color: '#70757a' }}>{leg.durationInMinutes} minutes{leg.segments[0].destination.parent.name}({leg.segments[0].destination.parent.displayCode})</Typography>
                                                        </Box>
                                                    </Grid>
                                                    <Grid item sm={2} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                        <Box>
                                                            <Typography sx={{ fontSize: 16, color: '#202124' }}>{itr.score} kg CO2e</Typography>
                                                            <Typography sx={{ fontSize: 12, color: '#70757a' }}>{itr.score} emission</Typography>
                                                        </Box>
                                                    </Grid>
                                                    <Grid item sm={2} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                        <Box>
                                                            <Typography sx={{ fontSize: 16, color: '#188038' }}>{itr.price.formatted}</Typography>
                                                        </Box>
                                                    </Grid>
                                                </Grid>
                                            </Stack> :
                                                <Stack direction={'row'} sx={{ py: 2, width: '100%' }}>
                                                    <Grid container sx={{ width: '100%' }}>
                                                        <Grid item sm={1} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                            <Box
                                                                component="img"
                                                                sx={{
                                                                    width: 35, // Set desired width
                                                                    height: 35, // Set desired height (optional)
                                                                }}
                                                                alt="Example Image"
                                                                src={leg.carriers.marketing[0].logoUrl}
                                                            />
                                                        </Grid>
                                                        <Grid item sm={3} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                            <Box>
                                                                <Typography sx={{ fontSize: 16, fontWeight: '900', color: '#202124' }}>Departure . {moment(leg.departure).format("ddd, MMM DD")} </Typography>
                                                            </Box>
                                                        </Grid>
                                                        <Grid item sm={3} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                            <Box>
                                                                <Typography sx={{ fontSize: 16, color: '#202124' }}>{itr.score} kg CO2e</Typography>
                                                                <Typography sx={{ fontSize: 12, color: '#70757a' }}>{itr.score} emission</Typography>
                                                            </Box>
                                                        </Grid>
                                                        <Grid item sm={3} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                            <Box>
                                                                <Button variant='outlined' sx={{ textTransform: 'none', borderRadius: 4 }} >Select flight</Button>
                                                            </Box>
                                                        </Grid>
                                                        <Grid item sm={2} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                            <Box>
                                                                <Typography sx={{ fontSize: 16, color: '#188038' }}>{itr.price.formatted}</Typography>
                                                            </Box>
                                                        </Grid>
                                                    </Grid>
                                                </Stack>

                                            ))}
                                    </AccordionSummary>

                                    <AccordionDetails sx={{ borderTop: '1px solid lightgray' }}>
                                        {
                                            itr.legs.map((leg, index) => (
                                                index === 0 && leg.segments.map((seg, index) =>
                                                    <Stack direction={'row'}>
                                                        <Grid container sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                                            <Grid item sm={8}>
                                                                <Timeline sx={{
                                                                    [`& .${timelineItemClasses.root}:before`]: {
                                                                        flex: 0,
                                                                        padding: 0,
                                                                    },
                                                                }}>
                                                                    <TimelineItem>
                                                                        <TimelineSeparator>
                                                                            <TimelineDot />
                                                                            <TimelineConnector />
                                                                        </TimelineSeparator>
                                                                        <TimelineContent sx={{ fontSize: 16, color: '#202124' }}>{seg.departure} , {seg.origin.parent.name} ({seg.origin.parent.displayCode})</TimelineContent>
                                                                    </TimelineItem>

                                                                    <TimelineItem>
                                                                        <TimelineSeparator>
                                                                            <TimelineDot />
                                                                        </TimelineSeparator>
                                                                        <TimelineContent sx={{ fontSize: 16, color: '#202124' }}>{seg.arrival} , {seg.destination.parent.name} ({seg.destination.parent.displayCode})</TimelineContent>
                                                                    </TimelineItem>
                                                                </Timeline>
                                                                <Box sx={{ px: 5, pb: 2 }} >
                                                                    <Typography sx={{ fontSize: 12, color: '#70757a' }}>{seg.marketingCarrier.name} . EconomyATR . {seg.marketingCarrier.displayCode != "" ? seg.marketingCarrier.displayCode : '726E'} . {seg.marketingCarrier.id}</Typography>
                                                                </Box>
                                                            </Grid>
                                                            <Grid item sm={4} sx={{ py: 3 }}>
                                                                <Stack direction={'row'} sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                                                                    <SvgIcon sx={{ fontSize: 20, color: "gray", p: 1 }}>
                                                                        <path d="M 20.6 11.84 l -0.09 0.16 l -0.41 0.71 l -3.25 5.62 l 1.85 2.8 l -0.5 0.87 l -5.2 -3 l 2.89 -5 H 9 c -1.1 0 -2 -0.9 -2 -2 V 3 h 6 v 6 h 5.77 c 1.47 0 2.4 1.53 1.8 2.83 l 0.03 0.01 Z M 13 15 H 6 V 3 H 4 v 12 c 0 1.1 0.9 2 2 2 h 7 v -2 Z" />
                                                                    </SvgIcon>
                                                                    <Typography sx={{ fontSize: 12, color: '#70757a' }}>Below average legroom (28 in)</Typography>
                                                                </Stack>
                                                                <Stack direction={'row'} sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                                                                    <SvgIcon sx={{ fontSize: 20, color: "gray", p: 1 }}>
                                                                        <path d="M 12 2 C 6.48 2 2 6.48 2 12 s 4.48 10 10 10 s 10 -4.48 10 -10 S 17.52 2 12 2 Z M 4 12 c 0 -0.61 0.08 -1.21 0.21 -1.78 L 8.99 15 v 1 c 0 1.1 0.9 2 2 2 v 1.93 C 7.06 19.43 4 16.07 4 12 Z m 13.89 5.4 c -0.26 -0.81 -1 -1.4 -1.9 -1.4 h -1 v -3 c 0 -0.55 -0.45 -1 -1 -1 h -6 v -2 h 2 c 0.55 0 1 -0.45 1 -1 V 7 h 2 c 1.1 0 2 -0.9 2 -2 v -0.41 C 17.92 5.77 20 8.65 20 12 c 0 2.08 -0.81 3.98 -2.11 5.4 Z" />
                                                                    </SvgIcon>
                                                                    <Typography sx={{ fontSize: 12, color: '#70757a' }}>Emissions estimate: 48 kg CO2e</Typography>
                                                                </Stack>
                                                            </Grid>
                                                            {leg.segments.length > 1 && leg.segments.map((fseg, i, arr) => {
                                                                const next = arr[index + 1] || null;
                                                                console.log('Next Element::', next)
                                                                console.log('moment.utc(moment(fseg.arrival)::', moment.utc(moment(fseg.arrival)))
                                                                if (next != null && i > 0) return (<Grid item sm={11.5} sx={{ borderBottom: '1px solid lightgray', borderTop: '1px solid lightgray', display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                                                                    <Box sx={{ py: 2 }} >
                                                                        <Box>
                                                                            <Typography sx={{ fontSize: 14, color: '#70757a' }} >{moment.utc(moment(fseg.arrival).diff(moment(next.departure))).format("HH:mm")} hour layover in {next.origin.parent.name} {next.displayCode}</Typography>
                                                                        </Box>
                                                                    </Box>
                                                                </Grid>)
                                                                else return <></>
                                                            })}
                                                        </Grid>
                                                    </Stack>
                                                ))
                                            )}
                                    </AccordionDetails>


                                </Accordion>
                            ))}
                    </div>
                </Box>
            </Grid> : <CircularProgress />}
        </Grid>
    )
}

export default DisplayFlights