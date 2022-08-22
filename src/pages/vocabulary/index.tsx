import React from 'react';
import { Words } from './words';
import './vocabualry.css';
import { GamesLinks } from './games-links';
import { Container } from '@mui/material';

export default function Vocabulary() {
  return (
    <Container component='main'>
      <Words />
      <GamesLinks />
    </Container>
  );
}
