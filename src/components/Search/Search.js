import { Paper, Grid, FilledInput, Box, Card, CardContent, Button, CircularProgress, ListItemIcon, IconButton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { RangeDatePicker, SingleDatePicker } from "react-google-flight-datepicker";
import "react-google-flight-datepicker/dist/main.css";
import SearchIcon from '@mui/icons-material/Search';
import EastIcon from '@mui/icons-material/East';
import MultipleStopIcon from '@mui/icons-material/MultipleStop';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ArrowCircleLeftRoundedIcon from '@mui/icons-material/ArrowCircleRightRounded';
import moment from 'moment';
import { useLocation, useNavigate } from 'react-router-dom';


//Checkbox
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import DoneIcon from '@mui/icons-material/Done';

// Auto completes
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import zIndex from '@mui/material/styles/zIndex';
import useApi from '../../Api/useApi';
// import DisplayFlights from '../DisplayFlights/DisplayFlights';
import { updateIsFlightsDisplay } from '../../store/displaySlice';
import { useDispatch, useSelector } from 'react-redux';
import DisplayFlights from '../DisplayFlights/DisplayFlights';

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


const TripTypes = [
    { value: 'Round trip', label: 'Round trip', icon: <MultipleStopIcon /> },
    { value: 'One way', label: 'One way', icon: <EastIcon /> },
    { value: 'Multi-city', label: 'Multi-city', icon: <SyncAltIcon /> },
];

const ClassTypes = [
    { value: 'economy', label: 'Economy' },
    { value: 'premium_economy', label: 'Premium economy' },
    { value: 'business', label: 'Business' },
    { value: 'first', label: 'First' },
];

const Search = () => {
    const initialFromCityData = useSelector((state) => state.nearByAirports.nearByAirportsData)
    const isFlightsDisplay = useSelector((state) => state.display.isFlightsDisplay); // Access Redux state

    console.log('initialFromCityData from search', initialFromCityData)

    const [tripType, setTripType] = useState(TripTypes[1].value);
    const [classType, setClassType] = useState(ClassTypes[0].label);

    const [fromCity, setFromCity] = useState('');
    const [toCity, setToCity] = useState('');

    const [selectedFromCity, setSelectedFromCity] = useState([]);
    const [selectedToCity, setSelectedToCity] = useState([]);

    const [fromCityData, setFromCityData] = useState([]);
    const [toCityData, setToCityData] = useState([]);
    const [isFromCityVisited, setIsFromCityVisited] = useState(false);
    const [searchParams, setSearchParams] = useState([]);



    const { callApi, error, loading } = useApi();

    const [adultsCount, setAdultsCount] = useState(1)
    const [childrensCount, setChildrensCount] = useState(0)
    const [infantsOneCount, setInfantsOneCount] = useState(0)
    const [infantsTwoCount, setInfantsTwoCount] = useState(0)
    const [totalPassengersCount, setTotalPassengersCount] = useState(1)
    const [journeyStartDate, setJourneyStartDate] = useState(new Date())
    const [journeyEndDate, setJourneyEndDate] = useState(new Date())
    const [searchedFlightsData, setSearchedFlightsData] = useState(null);
    const dispatch = useDispatch(); // Hook to dispatch actions


    const handleTripTypeChange = (event) => {
        const { target: { value } } = event;
        setTripType(value);
    };

    const handleClassTypeChange = (event) => {
        const { target: { value } } = event;
        console.log('value from handleClass', value)
        setClassType(value);
    };

    const getNearByAirports = async () => {
        try {
            const response = await callApi('/getNearByAirports', 'GET', null, { lat: '19.242218017578125', lng: '72.85846156046128', locale: 'en-US' });
        } catch (error) {
            console.error(error);
        }
    }

    const searchFromAirports = async (query) => {
        if (!query) return; // Avoid API calls if input is empty
        try {
            const response = await callApi('/searchAirport', 'GET', null, { query: query, locale: 'en-US' });
            setFromCityData(response.data)
            console.log('FromCityData from Search::', response.data)
        } catch (error) {
            console.error(error);
        }
    }
    const searchToAirports = async (query) => {
        if (!query) return; // Avoid API calls if input is empty
        try {
            const response = await callApi('/searchAirport', 'GET', null, { query: query, locale: 'en-US' });
            setToCityData(response.data)
        } catch (error) {
            console.error(error);
        }
    }
    const searchFlights = async (query) => {

        console.log('selectedFromCity[0] from search flights:', selectedFromCity)
        const tempFromArray = isFromCityVisited ? selectedFromCity[1] : null;
        const tempToArray = selectedToCity[0];
        const cabinClass = ClassTypes.filter((el) => el.label === classType);

        const finalAdultsCount = adultsCount.toString();
        const finalChildrensCount = childrensCount > 0 ? childrensCount.toString() : '0';
        const finalInfantsCount = infantsOneCount > 0 ? infantsOneCount.toString() : '0';

        // console.log('initialFromCityData.current.skyId', initialFromCityData.current.skyId)
        console.log('tempFromArray[0].skyId', tempFromArray)
        // console.log('initialFromCityData.current.entityId', initialFromCityData.current.entityId)
        // console.log('tempToArray[0].entityId', tempToArray[0].entityId)
        console.log('isFromCityVisited', isFromCityVisited)
        let params = {
            originSkyId: isFromCityVisited ? tempFromArray[0].skyId : initialFromCityData.current.skyId,
            destinationSkyId: tempToArray[0].skyId,
            originEntityId: isFromCityVisited ? tempFromArray[0].entityId : initialFromCityData.current.entityId,
            destinationEntityId: tempToArray[0].entityId,
            date: journeyStartDate,
            cabinClass: cabinClass[0].value,
            adults: finalAdultsCount,
            childrens: finalChildrensCount,
            infants: finalInfantsCount,
            sortBy: 'best',
            currency: 'USD',
            market: 'en-US',
            countryCode: 'US'
        }
        params = tripType == 'Round trip' ? { ...params, returnDate: journeyEndDate } : params;
        console.log('Params:', params)
        setSearchParams(params);
        dispatch(updateIsFlightsDisplay(true));
        // try {
        //     const response = await callApi('/searchFlights', 'GET', null, params);
        //     console.log('Search Flights Data444::', response.data)
        //     setSearchedFlightsData(response.data)
        //     dispatch(updateIsFlightsDisplay(true));

        // } catch (error) {
        //     console.error(error);
        // }
    }

    // useEffect(() => {
    //     getNearByAirports();
    // }, [])

    useEffect(() => {
        const timer = setTimeout(() => {
            searchFromAirports(fromCity);
        }, 300);
        return () => clearTimeout(timer);
    }, [fromCity]);

    useEffect(() => {
        const timer = setTimeout(() => {
            searchToAirports(toCity);
        }, 300);
        return () => clearTimeout(timer);
    }, [toCity]);


    const preventClose = (event) => {
        event.stopPropagation(); // Prevent the click from closing the menu
    };

    console.log('FromCityData::', fromCityData)
    return (
        <div>
            <Grid container sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                <Grid item container sm={8} sx={{ height: '80%', my: 2 }}>
                    <Card sx={{ width: '100%', pb: 4, borderRadius: 2, overflow: 'visible' }} elevation={4}>
                        <CardContent>
                            <Stack direction={'row'}>
                                <FormControl sx={{ m: 1, width: 'auto' }}>
                                    <Select
                                        labelId="demo-multiple-checkbox-label"
                                        id="demo-multiple-checkbox"
                                        value={tripType}
                                        onChange={handleTripTypeChange}
                                        input={<OutlinedInput label="Tag" />}
                                        renderValue={(selected) => {
                                            if (!selected) {
                                                return "Select an option"; // Placeholder
                                            }
                                            const selectedOption = TripTypes.find((option) => option.value === selected);

                                            return (
                                                <div style={{ display: "flex", alignItems: "center" }}>
                                                    {selectedOption.icon}
                                                    <span style={{ marginLeft: 8 }}>{selectedOption.label}</span>
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
                                        {TripTypes.map((name) => (
                                            <MenuItem key={name.value} value={name.value}>
                                                <Checkbox icon={<Box sx={{ width: 18, height: 18 }} />} checkedIcon={<DoneIcon />} checked={tripType.includes(name.value)} />
                                                <ListItemText primary={name.label} />
                                            </MenuItem>
                                        ))}


                                    </Select>
                                </FormControl>
                                <FormControl sx={{ m: 1, width: 'auto' }}>
                                    <Select
                                        labelId="demo-multiple-checkbox-label"
                                        id="demo-multiple-checkbox"
                                        value={totalPassengersCount}
                                        input={<OutlinedInput label="Tag" />}
                                        renderValue={(selected) => {
                                            return (
                                                <div style={{ display: "flex", alignItems: "center" }}>
                                                    <PersonOutlineIcon />
                                                    <span style={{ marginLeft: 8 }}>{selected}</span>
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
                                                }
                                            }
                                        }}
                                    >
                                        <Box sx={{ px: 3 }} >
                                            <Box onClick={preventClose} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                <ListItemText sx={{ mr: 10 }} primary='Adults' />
                                                <IconButton aria-label="delete" onClick={(e) => {
                                                    e.stopPropagation();
                                                    setAdultsCount((ac) => ac - 1)
                                                }} disabled={adultsCount < 2 ? true : false}>
                                                    <RemoveIcon />
                                                </IconButton>
                                                <Box sx={{ mx: 2, fontSize: 16 }} >{adultsCount}</Box>
                                                <IconButton onClick={(e) => {
                                                    e.stopPropagation();
                                                    setAdultsCount((ac) => ac + 1)
                                                }}
                                                    color='primary' >
                                                    <AddIcon />
                                                </IconButton>
                                            </Box>
                                            <Box onClick={preventClose} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                <ListItemText sx={{ mr: 10 }} primary='Children' />
                                                <IconButton aria-label="delete" onClick={(e) => {
                                                    e.stopPropagation();
                                                    setChildrensCount((ac) => ac - 1)
                                                }} disabled={childrensCount < 1 ? true : false}>
                                                    <RemoveIcon />
                                                </IconButton>
                                                <Box sx={{ mx: 2, fontSize: 16 }} >{childrensCount}</Box>
                                                <IconButton color='primary' onClick={(e) => {
                                                    e.stopPropagation();
                                                    setChildrensCount((ac) => ac + 1)
                                                }}>
                                                    <AddIcon />
                                                </IconButton>
                                            </Box>
                                            <Box onClick={preventClose} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                <ListItemText sx={{ mr: 10 }} primary='Infants' />
                                                <IconButton aria-label="delete" onClick={(e) => {
                                                    e.stopPropagation();
                                                    setInfantsOneCount((ic) => ic - 1)
                                                }} disabled={infantsOneCount < 1 ? true : false}>
                                                    <RemoveIcon />
                                                </IconButton>
                                                <Box sx={{ mx: 2, fontSize: 16 }} >{infantsOneCount}</Box>
                                                <IconButton color='primary' onClick={(e) => {
                                                    e.stopPropagation();
                                                    setInfantsOneCount((ic) => ic + 1)
                                                }} >
                                                    <AddIcon />
                                                </IconButton>
                                            </Box>
                                            <Box onClick={preventClose} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                <ListItemText sx={{ mr: 10 }} primary='Infants' />
                                                <IconButton aria-label="delete" onClick={(e) => {
                                                    e.stopPropagation();
                                                    setInfantsTwoCount((ic) => ic - 1)
                                                }} disabled={infantsTwoCount < 1 ? true : false}>
                                                    <RemoveIcon />
                                                </IconButton>
                                                <Box sx={{ mx: 2, fontSize: 16 }} >{infantsTwoCount}</Box>
                                                <IconButton color='primary' onClick={(e) => {
                                                    e.stopPropagation();
                                                    setInfantsTwoCount((ic) => ic + 1)
                                                }}>
                                                    <AddIcon />
                                                </IconButton>
                                            </Box>
                                            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                                <Button variant="text" sx={{ textTransform: 'none', ml: 5 }}>Cancel</Button>
                                                <Button variant="text" sx={{ textTransform: 'none' }} onClick={() => setTotalPassengersCount(childrensCount + adultsCount + infantsOneCount + infantsTwoCount)}>Add</Button>
                                            </Box>
                                        </Box>
                                    </Select>
                                </FormControl>
                                <FormControl sx={{ m: 1, width: 'auto' }}>
                                    <Select
                                        labelId="demo-multiple-checkbox-label"
                                        id="demo-multiple-checkbox"
                                        value={classType}
                                        onChange={handleClassTypeChange}
                                        renderValue={(selected) => selected}
                                        input={<OutlinedInput label="Tag" />}
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
                                                }
                                            }
                                        }}
                                    >
                                        {ClassTypes.map((name) => (
                                            <MenuItem key={name.value} value={name.label}>
                                                <Checkbox icon={<Box sx={{ width: 18, height: 18 }} />} checkedIcon={<DoneIcon />} checked={classType.includes(name.label)} />
                                                <ListItemText primary={name.label} />
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Stack>
                            <Stack direction={'row'}>
                                <Grid container>
                                    <Grid item sm={7} sx={{ display: 'flex', gap: 2, justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Autocomplete
                                            multiple
                                            id="tags-outlined"
                                            sx={{ width: '50%' }}
                                            // sx={{
                                            //     width: '50%',
                                            //     '& .MuiAutocomplete-endAdornment': {
                                            //         display: 'none', // Hide the up/down arrow icons
                                            //     },
                                            // }}

                                            options={isFromCityVisited ? fromCityData : [initialFromCityData.current]}
                                            defaultValue={[initialFromCityData.current]}
                                            getOptionLabel={(fromCity) => fromCity.presentation.title}
                                            loading={loading}
                                            onChange={(event, value) => {
                                                // setIsFromCityVisited(true);
                                                setSelectedFromCity((prevSelectedFromcities) => [...prevSelectedFromcities, value])
                                                console.log('SelectedFromCity', selectedFromCity); // `value` will be the selected object or null.
                                            }}
                                            onInputChange={(event, newInputValue) => {
                                                console.log('newInputValue::', newInputValue)
                                                setIsFromCityVisited(true);
                                                setFromCity(newInputValue);
                                            }}

                                            filterSelectedOptions
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    variant='outlined'
                                                    placeholder="Where else?"
                                                    sx={{
                                                        "& .MuiOutlinedInput-root": {
                                                            border: "1px solid lightgray",
                                                            "& fieldset": {
                                                                border: "1px solid lightgray", // Set light gray border
                                                            },
                                                            "&:hover fieldset": {
                                                                border: "1px solid lightgray", // Maintain same border on hover
                                                            },
                                                            "&.Mui-focused fieldset": {
                                                                border: "1px solid lightgray", // Maintain same border on focus
                                                            },
                                                        },
                                                        // "& .MuiSvgIcon-root": {
                                                        //     display: "none", // Hide arrow icons
                                                        // },
                                                    }}
                                                    InputProps={{
                                                        ...params.InputProps,
                                                        endAdornment: (
                                                            <>
                                                                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                                                {params.InputProps.endAdornment}
                                                            </>
                                                        ),
                                                    }}

                                                />
                                            )}
                                        />
                                        <IconButton disabled sx={{ mx: -20, zIndex: 20, ":hover": { backgroundColor: 'transparent' } }} aria-label="add an alarm">
                                            <ArrowCircleLeftRoundedIcon sx={{ fontSize: 40, px: 15, color: 'lightgray' }} />
                                        </IconButton>
                                        <Autocomplete
                                            multiple
                                            id="tags-outlined"
                                            sx={{ width: '50%' }}
                                            options={toCityData}
                                            getOptionLabel={(toCity) => toCity.presentation.title}
                                            // loading={loading}
                                            onChange={(event, value) => {
                                                setSelectedToCity((prevSelectedTocities) => [...prevSelectedTocities, value])
                                                console.log('SelectedToCity', selectedToCity); // `value` will be the selected object or null.
                                            }}
                                            onInputChange={(event, newInputValue) => {
                                                setToCity(newInputValue);
                                            }}
                                            filterSelectedOptions
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    variant='outlined'
                                                    placeholder="Where To?"
                                                    sx={{
                                                        "& .MuiOutlinedInput-root": {
                                                            border: "1px solid lightgray",
                                                            "& fieldset": {
                                                                border: "1px solid lightgray", // Set light gray border
                                                            },
                                                            "&:hover fieldset": {
                                                                border: "1px solid lightgray", // Maintain same border on hover
                                                            },
                                                            "&.Mui-focused fieldset": {
                                                                border: "1px solid lightgray", // Maintain same border on focus
                                                            },
                                                        },
                                                        // "& .MuiSvgIcon-root": {
                                                        //     display: "none", // Hide arrow icons
                                                        // },
                                                    }}
                                                    InputProps={{
                                                        ...params.InputProps,
                                                        endAdornment: (
                                                            <>
                                                                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                                                {params.InputProps.endAdornment}
                                                            </>
                                                        ),
                                                    }}
                                                />
                                            )}
                                        />
                                    </Grid>
                                    <Grid item sm={5}>
                                        {/* <RangeDatePicker
                                            startDate={new Date(2020, 0, 15)}
                                            endDate={new Date(2020, 1, 1)}
                                        /> */}
                                        {tripType == 'One way' || tripType == 'Multi-city' ? <SingleDatePicker
                                            startDate={journeyStartDate}
                                            onChange={(startDate) => {
                                                const formattedStartDate = moment(startDate).format('YYYY-MM-DD');
                                                console.log('formattedStartDate', typeof (formattedStartDate), formattedStartDate)
                                                setJourneyStartDate(formattedStartDate)
                                            }}
                                            minDate={new Date()}
                                            maxDate={new Date(2100, 0, 1)}
                                            dateFormat="ddd, MMM DD"
                                            monthFormat="MMM YYYY"
                                            startDatePlaceholder="Date"
                                            disabled={false}
                                            className="my-own-class-name"
                                            startWeekDay="monday"
                                        /> : <></>}
                                        {
                                            tripType == 'Round trip' &&
                                            <RangeDatePicker
                                                startDate={journeyStartDate}
                                                endDate={journeyEndDate}
                                                startDatePlaceholder="Departure"
                                                endDatePlaceholder="Arrival"
                                                minDate={new Date()}
                                                maxDate={new Date(2100, 0, 1)}
                                                dateFormat="ddd, MMM DD"
                                                monthFormat="MMM YYYY"
                                                onChange={(startDate, endDate) => {
                                                    const formattedStartDate = moment(startDate).format('YYYY-MM-DD');
                                                    const formattedEndDate = moment(endDate).format('YYYY-MM-DD');
                                                    setJourneyStartDate(formattedStartDate);
                                                    setJourneyEndDate(formattedEndDate)

                                                }}
                                            />
                                        }
                                    </Grid>
                                </Grid>
                            </Stack>
                        </CardContent>
                    </Card>
                    {!isFlightsDisplay && <Box sx={{ mt: -2, width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Button onClick={searchFlights} sx={{ borderRadius: 4, px: 2, textTransform: 'none' }} variant='contained' startIcon={<SearchIcon />}>
                            Explore
                        </Button>
                    </Box>}
                </Grid>
            </Grid>
            {isFlightsDisplay && <DisplayFlights searchParams={searchParams} />}
        </div>
    )
}

export default Search