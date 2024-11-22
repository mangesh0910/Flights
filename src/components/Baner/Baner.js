import { Grid, Typography } from '@mui/material';
import React from 'react';

const Baner = () => {
    return (
        <div>
            <Grid container sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                <Grid item container xs={12} sm={11} sx={{ height: '50vh', display: 'flex', flexDirection: 'column' }}>
                    <Grid item sx={{
                        backgroundColor: 'blue',
                        height: '80%',
                        backgroundImage: 'url(https://www.gstatic.com/travel-frontend/animation/hero/flights_nc_4.svg)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}>
                    </Grid>
                    <Grid item sx={{ height: '20%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Typography variant='h2' sx={{ fontSize: 56, fontWeight: 400, color: '#202124' }} >Flights</Typography>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}

export default Baner