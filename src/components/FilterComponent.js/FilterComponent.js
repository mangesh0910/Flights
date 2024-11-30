import { Grid, Box } from '@mui/material'
import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { filterArray } from '../../Data/FilterArrayData';

const FilterComponent = () => {
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
                        width: '100%',
                        backgroundColor: 'white',
                        borderRadius: '6px',
                    }}
                >
                    {filterArray.map((fa, index) => (
                        <Select
                            labelId="demo-select-label"
                            defaultValue="menu1"
                            sx={{

                                color: 'black',
                                fontWeight: '500',
                                color: index === 0 ? 'blue' : 'gray',
                                pr: 1,
                                '.MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'lightgray',
                                    borderRadius: '8px',
                                    border: index === 0 ? '0px solid lightgray' : '1px solid lightgray'
                                },
                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'gray',
                                    borderRadius: '8px',
                                },
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'gray',
                                    borderRadius: '8px',

                                },
                                backgroundColor: 'white',
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