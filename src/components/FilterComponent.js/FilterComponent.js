import { Grid, Box, FilledInput, Typography, Button } from '@mui/material'
import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import CalendarViewDayIcon from '@mui/icons-material/CalendarViewDay';
const filterArray = ['All Filters', 'Stops', 'Airlines', 'Bags', 'Price', 'Times', 'Emissions', 'Connecting Airports']

const FilterComponent = () => {
    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    return (
        <Grid container sx={{ width: '100%', display: 'flex', justifyContent: 'center', overflow: 'auto' }}>
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', pb: 2 }}>
                <FormControl
                    variant="outlined"
                    size="small"
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: 1,
                        width: '100%', // Adjust width as needed
                        backgroundColor: 'white', // White background
                        // border: '1px solid lightgray', // Light gray border
                        borderRadius: '6px',
                    }}
                >
                    {filterArray.map((fa, index) => (
                        <Select
                            labelId="demo-select-label"
                            defaultValue="menu1"
                            sx={{

                                color: 'black', // Black text color
                                fontWeight: '500',
                                color: index === 0 ? 'blue' : 'gray',
                                pr: 1,
                                '.MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'lightgray', // Border color
                                    borderRadius: '8px',
                                    border: index === 0 ? '0px solid lightgray' : '1px solid lightgray'
                                },
                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'gray', // Darker border on hover
                                    borderRadius: '8px',
                                },
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'gray', // Darker border when focused
                                    borderRadius: '8px',

                                },
                                backgroundColor: 'white', // Maintain white background
                            }}
                        >
                            <MenuItem value="menu1">{fa}</MenuItem>
                        </Select>))}

                </FormControl>
            </Box>
        </Grid>
    )
}

export default FilterComponent