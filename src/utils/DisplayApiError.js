import { Box, Paper, Typography } from '@mui/material'
import React from 'react'

const DisplayApiError = ({ errorMessage }) => {
    return (
        <Box >
            <Paper sx={{ display: 'flex', flexDirection: 'column', backgroundColor: '#ffc6b3', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh' }}>
                <Typography variant='h2'>API Error</Typography>
                <Typography variant='body1'>{errorMessage}</Typography>
                <Typography variant='body2'>If problem persist then please update and verify Rapid Api base url, key and host in axiosInstance.js file in the code</Typography>
            </Paper>
        </Box>
    )
}

export default DisplayApiError