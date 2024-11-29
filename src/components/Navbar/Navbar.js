import './Navbar.scss';
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import LuggageIcon from '@mui/icons-material/Luggage';
import FlightIcon from '@mui/icons-material/Flight';
import LocalHotelIcon from '@mui/icons-material/LocalHotel';
import VillaIcon from '@mui/icons-material/Villa';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import AppsIcon from '@mui/icons-material/Apps';

import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Divider, ListItemIcon } from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import FeedbackIcon from '@mui/icons-material/Feedback';
import SettingsIcon from '@mui/icons-material/Settings';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import EditLocationAltIcon from '@mui/icons-material/EditLocationAlt';
import LanguageIcon from '@mui/icons-material/Language';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';

const pages = [
    { label: 'Travel', icon: <LuggageIcon /> },
    { label: 'Explore', icon: <TravelExploreIcon /> },
    { label: 'Flights', icon: <FlightIcon /> },
    { label: 'Hotels', icon: <LocalHotelIcon /> },
    { label: 'Vacation rentals', icon: <VillaIcon /> },
    { label: 'Tracked flight prices', icon: <TrendingUpIcon /> },
    { label: 'Change language', icon: <LanguageIcon /> },
    { label: 'Change currency', icon: <LocalAtmIcon /> },
    { label: 'Change location', icon: <EditLocationAltIcon /> },
    { label: 'Flights setting', icon: <SettingsIcon /> },
    { label: 'Feedback', icon: <FeedbackIcon /> },
    { label: 'Help', icon: <HelpOutlineIcon /> },

];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function Navbar() {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [isDrawerOpen, setDrawerOpen] = React.useState(false);

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setDrawerOpen(open);
    };

    const drawerContent = (
        <List>
            {pages.map((text, index) => (
                <>
                    <ListItem button key={text.label}>
                        <ListItemIcon>{text.icon}</ListItemIcon>
                        <ListItemText primary={text.label} />
                    </ListItem>
                    {index === 4 || index === 8 ? <Divider sx={{ my: 1 }} /> : null}
                </>

            ))}
        </List>
    );

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <div className='container'>
            <AppBar position="static" >
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            onClick={toggleDrawer(true)}
                        >
                            <MenuIcon sx={{ color: 'gray', fontSize: 30, display: { xs: 'none', md: 'flex' }, mr: 0 }} />
                        </IconButton>
                        <Box
                            noWrap
                            component="a"
                            href="#app-bar-with-responsive-menu"
                            sx={{
                                mx: 2,
                                display: { xs: 'none', md: 'flex' },
                            }}
                        >
                            <img slt='Logo' src='https://www.gstatic.com/images/branding/googlelogo/svg/googlelogo_clr_74x24px.svg' />

                        </Box>

                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon sx={{ color: 'gray', fontSize: 30 }} />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{ display: { xs: 'block', md: 'none' } }}
                            >
                                {pages.map((page, index) => (
                                    <MenuItem key={page.label} onClick={handleCloseNavMenu}>
                                        <Typography sx={{ textAlign: 'center', textTransform: 'none' }}>{page.label}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                        <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                        <Typography
                            variant="h5"
                            noWrap
                            component="a"
                            href="#app-bar-with-responsive-menu"
                            sx={{
                                mr: 2,
                                display: { xs: 'flex', md: 'none' },
                                flexGrow: 1,
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            LOGO
                        </Typography>
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                            {pages.map((page, index) => (
                                index < 5 ?
                                    <Button
                                        variant='outlined'
                                        startIcon={page.icon}
                                        key={page.label}
                                        onClick={handleCloseNavMenu}
                                        sx={{ my: 2, mx: 1, borderRadius: 6, textTransform: 'none', border: '1px solid lightgray' }}
                                    >
                                        <Typography sx={{ color: '#202124', fontSize: 16, fontWeight: 500, p: 0.5 }}>{page.label}</Typography>
                                    </Button> : null
                            ))}
                        </Box>
                        <Box sx={{ flexGrow: 0, display: 'flex', justifyContent: 'space-evenly', gap: 2, alignItems: 'center' }}>
                            <DarkModeIcon sx={{ color: 'gray', fontSize: 30 }} />
                            <AppsIcon sx={{ color: 'gray', fontSize: 30 }} />
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                {settings.map((setting) => (
                                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                        <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            <Drawer
                variant='temporary'
                anchor="left"
                open={isDrawerOpen}
                onClose={toggleDrawer(false)}
                sx={{ marginTop: '64px', '& .MuiModal-backdrop': { backgroundColor: 'rgba(0,0,0,0)' } }}
                ModalProps={{
                    keepMounted: true,
                }}
                PaperProps={{
                    sx: {
                        marginTop: '75px',
                        width: '270px',
                        overflowY: 'scroll'
                    },
                }}
            >
                {drawerContent}
            </Drawer>
        </div>
    );
}
export default Navbar;