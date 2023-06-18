import * as React from 'react'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import MuiDrawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import {
  AppBar,
  Avatar,
  Button,
  CardMedia,
  Toolbar,
  Tooltip,
} from '@mui/material'
import { Icon } from '@iconify/react'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { btn, df_jc_ac, df_jfe_ac } from '../../theme/CssMy'
import { useContext } from 'react'
import { codivascontext } from '../../context/MainContext'
import { generateFromString } from 'generate-avatar'
import slogo from '../../images/logo.png'

const drawerWidth = 240

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
})

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(8)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
})

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  boxShadow: '0px 1px 26px rgba(94, 99, 116, 0.05)',
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}))

const imgStyle = {
  borderRadius: '50px',
}

const listItemBtn = {
  justifyContent: 'initial',
  px: 2.5,
}

const listItemIco = {
  minWidth: 0,
  justifyContent: 'center',
}

const gridcon = {
  display: 'flex',
  alignItems: 'space-between',
  flexDirection: 'column',
  height: '100vh',
  justifyContent: 'space-between',
}

export default function SideDrawer(props) {
  const { children } = props
  const url = window.location.href.split('/')[3]
  const { user, setUser, setToken } = useContext(codivascontext)
  const navigate = useNavigate()
//   console.log(url)
//   console.log(user)
  const isBene =
    JSON.parse(localStorage.getItem('codivasUser')).type === 'beneficiary'
      ? true
      : false
  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        sx={{
          marginLeft: '50px',
          backgroundColor: 'white',
          color: '#375EC0',
          boxShadow: '0px 1px 26px rgba(94, 99, 116, 0.05)',
        }}
      >
        <Toolbar sx={df_jfe_ac}>
          <Avatar
            sx={{ marginRight: '2%' }}
            alt={user?.phone}
            src={`data:image/svg+xml;utf8,${generateFromString(user?.phone)}`}
          />
          <Button
            sx={btn}
            onClick={() => {
              localStorage.setItem('codivasUser', null)
              localStorage.setItem('codivasToken', null)
              navigate('/login')
            }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        PaperProps={{
          sx: {
            backgroundColor: '#161616',
            // color: 'red',
          },
        }}
      >
        <Box sx={gridcon}>
          <Box sx={{ ...df_jc_ac, marginTop: '5%' }}>
            <CardMedia
              component="img"
              image={slogo}
              sx={{ borderRadius: '50px', width: '98%', marginTop: '15%' }}
            />
          </Box>
          <Box>
            <List>
              <Tooltip title="Activity Logs">
                <ListItem
                  disablePadding
                  onClick={() => navigate('/')}
                  sx={{ display: 'block', marginTop: '20%' }}
                >
                  <ListItemButton sx={listItemBtn}>
                    <ListItemIcon sx={listItemIco}>
                      <Icon
                        icon="ph:note-bold"
                        color={url === '' ? '#375EC0' : '#6A707F'}
                        width="26"
                        height="26"
                      />
                    </ListItemIcon>
                  </ListItemButton>
                </ListItem>
              </Tooltip>
              <Tooltip title="View Entities">
                <ListItem
                  disablePadding
                  onClick={() => navigate('/viewentities')}
                  sx={{ display: 'block', marginTop: '20%' }}
                >
                  <ListItemButton sx={listItemBtn}>
                    <ListItemIcon sx={listItemIco}>
                      <Icon
                        color={
                          url.includes('viewentities') ? '#375EC0' : '#6A707F'
                        }
                        icon="ic:outline-people"
                        width="24"
                        height="24"
                      />
                    </ListItemIcon>
                  </ListItemButton>
                </ListItem>
              </Tooltip>
            </List>
          </Box>
          <Box></Box>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  )
}
