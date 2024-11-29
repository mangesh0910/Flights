import { Button, Grid, Typography } from '@mui/material'
import React from 'react'
import { CheapFlightsData } from '../../Data/CheapFlightsData'


const CheapFlights = () => {
    return (
        <Grid container sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <Grid item container sm={8} sx={{ height: '80%', my: 2 }}>
                <Typography variant='h6' sx={{ py: 1, color: '#202124', fontSize: 20 }}>Find cheap flights on popular routes</Typography>
                <Grid container sm={12} sx={{ width: '100%', display: 'flex' }}>
                    <Grid item sm={4}>
                        {
                            CheapFlightsData.map((cf, i) => (
                                i < 7 &&
                                <Button variant='text' sx={{ textTransform: 'none', fontSize: 14, fontWeight: 400 }}>{cf.details}</Button>
                            ))
                        }
                    </Grid>
                    <Grid item sm={4}>
                        {
                            CheapFlightsData.map((cf, i) => (
                                i > 6 && i < 14 &&
                                <Button variant='text' sx={{ textTransform: 'none', fontSize: 14, fontWeight: 400 }}>{cf.details}</Button>
                            ))
                        }
                    </Grid>
                    <Grid item sm={4}>
                        {
                            CheapFlightsData.map((cf, i) => (
                                i > 13 &&
                                <Button variant='text' sx={{ textTransform: 'none', fontSize: 14, fontWeight: 400 }}>{cf.details}</Button>

                            ))
                        }
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default CheapFlights