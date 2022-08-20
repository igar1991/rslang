import { Box, Typography } from '@mui/material';
import { GameCard } from './game-card';
import './games-link.css';
import { useDevice } from '../../hooks';

const headingByDeviceMap: Map<string, 'h4' | 'h5' | 'h6'> = new Map([
  ['desktop', 'h4'],
  ['tablet', 'h5'],
  ['mobile', 'h6'],
]);

export const GamesLinks = () => {
  const device = useDevice();

  return (
    <Box className='vocabulary__games-links'>
      <Typography
        variant={headingByDeviceMap.get(device)}
        className='games-links__title'
      >
        Check your skills by playing games!
      </Typography>
      <Box className='game-cards__wrapper'>
        <GameCard
          img='/assets/game-sprint.png'
          title='Sprint'
          description='Quickly find if provided translation correct'
        />
        <GameCard
          img='/assets/game-listen.png'
          title='Audio Challenge'
          description='Try to recognize the word speaker says'
        />
      </Box>
    </Box>
  );
};
