import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Box } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';

import { useAppSelector } from '../../../../redux/hooks';
import { selectAuth } from '../../../../redux/slices/authUserSlice';

import './nav.css';

type NavType = { 
  navLinks: { url: string; name: string; icon: JSX.Element }[],
  openAuthorizationModal: () => void,
  openProfileModal: () => void,
};

export default function Nav({ navLinks, openAuthorizationModal, openProfileModal }: NavType): JSX.Element {
  const user = useAppSelector(selectAuth);

  const setActive = ({ isActive }: { isActive: boolean }) => (isActive ? 'nav__item nav__active-item' : 'nav__item');

  return (
    <Box sx={{ display: { xs: 'none', sm: 'flex', gap: '25px' } }} component='nav'>
      <Box className='nav'>
        {navLinks.map((item, index) => {
          if (index < navLinks.length)
            return (
              <NavLink key={item.name} to={item.url} className={setActive}>
                {item.name}
              </NavLink>
            );
        })}
      </Box>
      {user.isAuth ? (
        <IconButton onClick={openProfileModal}>
          <Avatar sx={{ bgcolor: '#7B1FA2' }}>
            {user.name?.[0]}
          </Avatar>
        </IconButton>
      ) : (
        <Button variant='outlined' color='secondary' onClick={openAuthorizationModal}>Sign in</Button>
      )}
    </Box>
  );
}
