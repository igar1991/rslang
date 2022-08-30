import React from 'react';
import { Box, Container } from '@mui/material';

import { GamesCards } from './components/start/game-cards';
import { Background } from './components/background';
import './games.css';

const GAMES = [
  {
    name: 'Sprint',
    img: '/assets/game-sprint.png',
    description: 'Quickly find if provided translation correct',
    url: '/games/sprint',
  },
  {
    name: 'Audio Challenge',
    img: '/assets/game-listen.png',
    description: 'Try to recognize the word speaker says',
    url: '/games/audiocall',
  },
];

export default function Games() {
  return (
    <Container component='main' className='games__container'>
      <h2 className='games__title'>Check your skills by playing games!</h2>
      <Box className='games__cards'>
        {GAMES.map((game) => (
          <GamesCards key={game.name} game={game} />
        ))}
      </Box>
      <Background word='LANGLISH' />
    </Container>
  );
}
