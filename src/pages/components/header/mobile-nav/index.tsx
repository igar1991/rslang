import React from 'react';
import { NavLink } from 'react-router-dom';
import { ListItemIcon } from '@mui/material';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';

import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import CloseIcon from '@mui/icons-material/Close';

import './mobile-nav.css';

type MobileNavType = {
  mobileOpen: boolean;
  onMobileBtnClick: () => void;
  navLinks: { url: string; name: string; icon: JSX.Element }[];
};

export default function MobileNav({ mobileOpen, onMobileBtnClick, navLinks }: MobileNavType): JSX.Element {
  const setActive = ({ isActive }: { isActive: boolean }) =>
    isActive ? 'mobile-nav__item mobile-nav__active-item' : 'mobile-nav__item';

  return (
    <Drawer
      anchor='right'
      variant='temporary'
      open={mobileOpen}
      onClose={onMobileBtnClick}
      ModalProps={{
        keepMounted: true,
      }}
      sx={{
        display: { xs: 'block', sm: 'none' },
        '& .MuiDrawer-paper': { width: '100%' },
      }}
    >
      <Box onClick={onMobileBtnClick} sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <Box sx={{ display: 'flex', padding: '25px 20px', justifyContent: 'space-between' }}>
          <NavLink to='/'>
            <img src='assets/logo.png' alt='logo' />
          </NavLink>
          <IconButton>
            <CloseIcon className='nav__icon' />
          </IconButton>
        </Box>
        <List sx={{}} className='mobile-nav__items'>
          {navLinks.map((item) => (
            <NavLink key={item.name} to={item.url} className={setActive}>
              <ListItemButton className='mobile-nav__button'>
                <p className='mobile-nav__text'>{item.name}</p>
                <ListItemIcon className='mobile-nav__icon'>{item.icon}</ListItemIcon>
              </ListItemButton>
            </NavLink>
          ))}
        </List>
      </Box>
    </Drawer>
  );
}
