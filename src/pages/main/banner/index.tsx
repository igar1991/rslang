import React from 'react';
import { Button } from '@mui/material';
import { Box } from '@mui/system';

import './banner.css';
import { useAppSelector } from '../../../redux/hooks';
import { selectAuth } from '../../../redux/slices/authUserSlice';

type InBannerType = {
  openRegisterModal: () => void,
  openAuthorizationModal: () => void,
}

export default function Banner({ openRegisterModal, openAuthorizationModal }: InBannerType): JSX.Element {
  const user = useAppSelector(selectAuth);

  return (
    <Box
      className='banner'
      sx={{
        display: { sm: 'flex', xs: 'block' },
        alignItems: 'center',
        backgroundImage: `url(${'/assets/welcom.png'})`,
      }}
    >
      <Box sx={{ width: { xs: '100%', sm: '50%' } }} className='banner__text-container'>
        <h2 className='banner__title'>The free, fun, and effective way to learn English!</h2>
        {
          !user.isAuth ?
            <Box className='banner__button-container'>
              <Button variant='contained' color='secondary' className='banner__button' onClick={openRegisterModal}>
                Sign up for free
              </Button>
              <Button variant='outlined' color='secondary' className='banner__button' onClick={openAuthorizationModal}>
                I already have an account
              </Button>
            </Box> : ''
        }
      </Box>
    </Box>
  );
}
