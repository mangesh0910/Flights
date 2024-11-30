import { Box, Grid, Typography } from '@mui/material';
import React from 'react'
import Accordion, { accordionClasses } from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails, { accordionDetailsClasses, } from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Fade from '@mui/material/Fade';
import FaqData from '../../Data/FaqData';



const Faq = () => {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpansion = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <Grid container sx={{ width: '100%', display: 'flex', justifyContent: 'center', mx: { xs: 2, sm: 0 } }}>
            <Grid item container sm={8} sx={{ my: 2 }}>
                <Typography variant='h6' sx={{ py: 1, color: '#202124', fontSize: 20 }}>Frequently asked questions</Typography>
                <Box sx={{ width: '100%' }}>
                    {
                        FaqData.map((faq) => (
                            <Accordion
                                key={faq.id}
                                expanded={expanded === faq.id}
                                onChange={handleExpansion(faq.id)}
                                slots={{ transition: Fade }}
                                slotProps={{ transition: { timeout: 400 } }}
                                sx={[
                                    expanded === faq.id
                                        ? {
                                            [`& .${accordionClasses.region}`]: {
                                                height: 'auto',
                                            },
                                            [`& .${accordionDetailsClasses.root}`]: {
                                                display: 'block',
                                            },
                                        }
                                        : {
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
                                    <Typography sx={{ fontSize: 16, fontWeight: 500, color: '#202124' }}>{faq.ques}</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography sx={{ fontSize: 16, fontWeight: 400, color: '#3C4043' }}>
                                        {faq.ans}
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>))
                    }
                </Box>
            </Grid>
        </Grid>
    )
}

export default Faq;