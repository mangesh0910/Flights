import { Grid, Button, Box, Typography } from '@mui/material'
import React from 'react'
import LanguageIcon from '@mui/icons-material/Language';
import EditLocationAltIcon from '@mui/icons-material/EditLocationAlt';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';


const Footer = () => {
    return (
        <Grid container sx={{ width: '100%', display: 'flex', justifyContent: 'center', my: 4, mx: { xs: 2, sm: 0 } }}>
            <Grid item container sm={8} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', borderTop: '1px solid lightgray', borderBottom: '2px solid lightgray', height: '80%', py: 4 }}>
                <Box sm={8} sx={{ width: '100%', display: 'flex', gap: 2, justifyContent: 'center', alignItems: 'center' }}>
                    <Button variant="outlined" sx={{ textTransform: 'none', borderRadius: 4, border: '1px solid lightgray' }} startIcon={<LanguageIcon />}>
                        Language . English (United States)
                    </Button>
                    <Button variant="outlined" sx={{ textTransform: 'none', borderRadius: 4, border: '1px solid lightgray' }} startIcon={<EditLocationAltIcon />}>
                        Location . India
                    </Button>
                    <Button variant="outlined" sx={{ textTransform: 'none', borderRadius: 4, border: '1px solid lightgray' }} startIcon={<LocalAtmIcon />}>
                        Currency . INR
                    </Button>
                </Box>
                <Box sx={{ py: 4 }}>
                    <Typography sx={{ textAlign: 'center', color: '#70757A' }}>
                        Current language and currency options applied: English (United States) - India - INR
                        Displayed currencies may differ from the currencies used to purchase flights. Learn more
                    </Typography>
                </Box>
                <Box sm={8} sx={{ width: '100%', display: 'flex', gap: 2, justifyContent: 'center', alignItems: 'center' }}>
                    <Button variant='text' sx={{ textTransform: 'none', fontSize: 14, fontWeight: 400 }}>
                        About
                    </Button>
                    <Button variant='text' sx={{ textTransform: 'none', fontSize: 14, fontWeight: 400 }} >
                        Privacy
                    </Button>
                    <Button variant='text' sx={{ textTransform: 'none', fontSize: 14, fontWeight: 400 }} >
                        Join user studies
                    </Button>
                    <Button variant='text' sx={{ textTransform: 'none', fontSize: 14, fontWeight: 400 }}>
                        Feedback
                    </Button>
                    <Button variant='text' sx={{ textTransform: 'none', fontSize: 14, fontWeight: 400 }} >
                        Help Center
                    </Button>
                </Box>
            </Grid>
        </Grid>
    )
}

export default Footer