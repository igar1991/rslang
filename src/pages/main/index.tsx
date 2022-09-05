import React from 'react';
import { Box, Container } from '@mui/material';

import Banner from './banner';
import Advantages from './advantages';
import About from './about-us';

import './main.css';

type InMainType = {
  openRegisterModal: () => void;
  openAuthorizationModal: () => void;
};

export default function Main({ openRegisterModal, openAuthorizationModal }: InMainType): JSX.Element {
  return (
    <Box className='main'>
      <Container component='main'>
        <Banner openRegisterModal={openRegisterModal} openAuthorizationModal={openAuthorizationModal} />
        <Advantages />
        <About />
      </Container>
    </Box>
  );
}
