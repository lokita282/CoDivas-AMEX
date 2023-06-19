import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Icon } from '@iconify/react';
import { Avatar, Button, CardMedia } from '@mui/material';
import logo from '../../images/logo.png'
import slogo from '../../images/logoshort.png'
import { useNavigate } from 'react-router';
import { btn, df_jfs_ac_fdc } from '../../theme/CssMy';
import { useContext } from 'react';
import { merchant } from '../../context/MainContext';
import { generateFromString } from 'generate-avatar'

const drawerWidth = 240;

function ResponsiveDrawer(props) {
    const navigate = useNavigate()
    const { children } = props;
    const url = window.location.href.split('/')[3]
    const [mobileOpen, setMobileOpen] = React.useState(false);
    console.log(url)
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    const { user } = useContext(merchant)

    const drawer = (
        <div style={df_jfs_ac_fdc}>
            <CardMedia sx={{ width: '50%', paddingLeft: '5%', paddingTop: '5%' }} component='img' image={logo} />
            <List>
                <ListItem disablePadding onClick={() => navigate('/')} sx={url === '' ? { color: '#375EC0' } : { color: "#6A707F" }}>
                    <ListItemButton>
                        <ListItemIcon>
                            <Icon color={url === '' ? '#375EC0' : '#6A707F'} icon="ic:round-dashboard" width={26} height={26} />
                        </ListItemIcon>
                        <ListItemText primary={'Dashboard'} />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding onClick={() => navigate('/scan')} sx={url?.includes('scan') ? { color: '#375EC0' } : { color: "#6A707F" }}>
                    <ListItemButton>
                        <ListItemIcon>
                            <Icon icon="ph:scan-fill" width={26} height={26} color={url?.includes('scan') ? '#375EC0' : '#6A707F'} />
                        </ListItemIcon>
                        <ListItemText primary={'Scan QR'} />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding onClick={() => navigate('/message')} sx={url?.includes('message') ? { color: '#375EC0' } : { color: "#6A707F" }}>
                    <ListItemButton>
                        <ListItemIcon>
                            <Icon icon="mdi:message" width={26} height={26} color={url?.includes('message') ? '#375EC0' : '#6A707F'} />
                        </ListItemIcon>
                        <ListItemText primary={'Scan Message'} />
                    </ListItemButton>
                </ListItem>
            </List>

        </div>
    );


    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                    backgroundColor: 'white',
                    boxShadow: 'none',

                }}
            >
                <Toolbar sx={{
                    display: 'flex',
                    justifyContent: 'space-between'
                }}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon sx={{ color: '#375EC0' }} />
                    </IconButton>
                    <div style={{ display: 'flex' }}>
                        <Avatar sx={{ marginRight: '5%' }} alt={user?.phone} src={`data:image/svg+xml;utf8,${generateFromString(user?.phone)}`} />
                        <Button sx={btn} onClick={() => {
                            localStorage.setItem('codivasUser', null)
                            localStorage.setItem('codivasToken', null)
                            navigate('/login')
                        }}>Logout</Button>
                    </div>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: '200px' },
                    }}
                >
                    {drawer}
                </Drawer>

            </Box>
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
                <Toolbar />
                {children}
            </Box>
        </Box>
    );
}

ResponsiveDrawer.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

export default ResponsiveDrawer;