import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import { Container } from '@mui/system';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';

import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import HomeIcon from '@mui/icons-material/Home';
import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined';
import SignalCellularAltRoundedIcon from '@mui/icons-material/SignalCellularAltRounded';

import Nav from './nav';
import MobileNav from './mobile-nav';

import './header.css';

const NAV_LINKS = [
  { url: '/', name: 'Main', icon: <HomeIcon /> },
  { url: '/vocabulary', name: 'Vocabulary', icon: <AutoStoriesOutlinedIcon /> },
  { url: '/games', name: 'Games', icon: <SportsEsportsIcon /> },
  { url: '/statistics', name: 'Statistics', icon: <SignalCellularAltRoundedIcon /> },
];

type InHeaderType = {
  openAuthorizationModal: () => void,
}

export default function Header({openAuthorizationModal}: InHeaderType): JSX.Element {
  const [mobileOpen, setMobileOpen] = useState(false);

  const onMobileBtnClick = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <>
      <AppBar
        color='transparent'
        position='relative'
        sx={{  backgroundColor: 'transparent', py: 2, boxShadow: 'none' }}
      >
        <Container sx={{ display: 'flex' }}>
          <Typography sx={{ flexGrow: 1 }}>
            <NavLink to='/'>
              <img src='assets/logo.png' alt='logo' />
            </NavLink>
          </Typography>

          <IconButton onClick={onMobileBtnClick} sx={{ display: { sm: 'none' } }}>
            <MenuIcon className='nav__icon' />
          </IconButton>

          <Nav navLinks={NAV_LINKS} openAuthorizationModal={openAuthorizationModal}/>
        </Container>
      </AppBar>

      <Box component='nav'>
        <MobileNav mobileOpen={mobileOpen} onMobileBtnClick={onMobileBtnClick} navLinks={NAV_LINKS} openAuthorizationModal={openAuthorizationModal}/>
      </Box>
    </>
  );
}
