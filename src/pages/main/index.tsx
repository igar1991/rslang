import React from 'react';
import { Container } from '@mui/material';

import Banner from './banner';
import Advantages from './advantages';
import About from './about-us';

import './main.css';

export default function Main(): JSX.Element {
  return (
    <Container component='main'>
      <Banner />
      <Advantages />
      <About />
    </Container>
  );
}
