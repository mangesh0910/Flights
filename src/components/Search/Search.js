import { Paper, Grid, FilledInput, Box, Card, CardContent, Button } from '@mui/material'
import React from 'react'
import { RangeDatePicker, SingleDatePicker } from "react-google-flight-datepicker";
import "react-google-flight-datepicker/dist/main.css";
import SearchIcon from '@mui/icons-material/Search';

//Checkbox
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import DoneIcon from '@mui/icons-material/Done';
import { top100Films } from '../../Data/TestData';

// Auto completes
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import zIndex from '@mui/material/styles/zIndex';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};


const TripTypes = [
    'Round trip',
    'One way',
    'Multi-city',
];

const ClassTypes = [
    'Economy',
    'Premium economy',
    'Business',
    'First'
];

const NoOfPassengers = [0, 1, 2, 3, 4, 5, 6, 7]




const Search = () => {
    const [tripType, setTripType] = React.useState(TripTypes[0]);
    const [classType, setClassType] = React.useState(ClassTypes[0]);
    const [noOfPassengers, setNoOfPassengers] = React.useState(NoOfPassengers[0]);

    const handleTripTypeChange = (event) => {
        const {
            target: { value },
        } = event;
        setTripType(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const handleClassTypeChange = (event) => {
        const {
            target: { value },
        } = event;
        setClassType(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const handleNoOfPassengersChange = (event) => {
        const {
            target: { value },
        } = event;
        setNoOfPassengers(value);
    };


    return (
        <div>
            <Grid container sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                <Grid item container sm={8} sx={{ height: '80%', my: 2, }}>
                    <Card sx={{ width: '100%', pb: 4, borderRadius: 2, overflow: 'visible' }} elevation={4}>
                        <CardContent>
                            <Stack direction={'row'}>
                                <FormControl sx={{ m: 1, width: 'auto' }}>
                                    <Select
                                        labelId="demo-multiple-checkbox-label"
                                        id="demo-multiple-checkbox"
                                        value={tripType}
                                        onChange={handleTripTypeChange}
                                        input={<FilledInput label="Tag" />}
                                        renderValue={(selected) => selected}
                                        MenuProps={MenuProps}
                                        sx={{
                                            '& .MuiFilledInput-input': {
                                                backgroundColor: 'white'
                                            }
                                        }}
                                    >
                                        {TripTypes.map((name) => (
                                            <MenuItem key={name} value={name}>
                                                <Checkbox icon={<Box sx={{ width: 18, height: 18 }} />} checkedIcon={<DoneIcon />} checked={tripType.includes(name)} />
                                                <ListItemText primary={name} />
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <FormControl sx={{ m: 1, width: 'auto' }}>
                                    <Select
                                        labelId="demo-multiple-checkbox-label"
                                        id="demo-multiple-checkbox"
                                        value={noOfPassengers}
                                        onChange={handleNoOfPassengersChange}
                                        input={<FilledInput label="Tag" />}
                                        renderValue={(selected) => selected}
                                        MenuProps={MenuProps}
                                        sx={{
                                            '& .MuiFilledInput-input': {
                                                backgroundColor: 'white'
                                            }
                                        }}
                                    >
                                        {NoOfPassengers.map((name) => (
                                            <MenuItem key={name} value={name}>
                                                <Checkbox icon={<Box sx={{ width: 18, height: 18 }} />} checkedIcon={<DoneIcon />} checked={noOfPassengers.toString().includes(name.toString())} />
                                                <ListItemText primary={name} />
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <FormControl sx={{ m: 1, width: 'auto' }}>
                                    <Select
                                        labelId="demo-multiple-checkbox-label"
                                        id="demo-multiple-checkbox"
                                        value={classType}
                                        onChange={handleClassTypeChange}
                                        input={<FilledInput label="Tag" />}
                                        renderValue={(selected) => selected}
                                        MenuProps={MenuProps}
                                        sx={{
                                            '& .MuiFilledInput-input': {
                                                backgroundColor: 'white'
                                            }
                                        }}
                                    >
                                        {ClassTypes.map((name) => (
                                            <MenuItem key={name} value={name}>
                                                <Checkbox icon={<Box sx={{ width: 18, height: 18 }} />} checkedIcon={<DoneIcon />} checked={classType.includes(name)} />
                                                <ListItemText primary={name} />
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
                                            options={top100Films}
                                            getOptionLabel={(option) => option.title}
                                            defaultValue={[top100Films[13]]}
                                            filterSelectedOptions
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    variant='outlined'
                                                    placeholder="Where else?"
                                                />
                                            )}
                                        />
                                        <Autocomplete
                                            multiple
                                            id="tags-outlined"
                                            sx={{ width: '50%' }}
                                            options={top100Films}
                                            getOptionLabel={(option) => option.title}
                                            defaultValue={[top100Films[13]]}
                                            filterSelectedOptions
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    variant='outlined'
                                                    placeholder="Where To?"
                                                />
                                            )}
                                        />
                                    </Grid>
                                    <Grid item sm={5}>
                                        {/* <RangeDatePicker
                                            startDate={new Date(2020, 0, 15)}
                                            endDate={new Date(2020, 1, 1)}
                                        /> */}
                                        <SingleDatePicker
                                            startDate={new Date()}
                                            // onChange={(startDate) => onDateChange(startDate)}
                                            minDate={new Date(1900, 0, 1)}
                                            maxDate={new Date(2100, 0, 1)}
                                            dateFormat="DD MM YYYY"
                                            monthFormat="MMM YYYY"
                                            startDatePlaceholder="Date"
                                            disabled={false}
                                            className="my-own-class-name"
                                            startWeekDay="monday"
                                        />
                                    </Grid>
                                </Grid>
                            </Stack>
                        </CardContent>
                    </Card>
                    <Box sx={{ mt: -2, width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Button sx={{ borderRadius: 4, px: 2, textTransform: 'none' }} variant='contained' startIcon={<SearchIcon />}>
                            Explore
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </div>
    )
}

export default Search