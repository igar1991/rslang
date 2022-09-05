import { Box, Typography } from '@mui/material';
import { GameCard } from './game-card';
import { useDevice } from '../../hooks';
import { useAppSelector } from 'redux/hooks';
import { selectAuth } from 'redux/slices/authUserSlice';
import './games-link.css';
import { AuthGameCard } from './game-card/auth-game-card';

const headingByDeviceMap: Map<string, 'h4' | 'h5' | 'h6'> = new Map([
  ['desktop', 'h4'],
  ['tablet', 'h5'],
  ['mobile', 'h6'],
]);

const GAMES = [
  {
    img: '/assets/game-sprint.png',
    title: 'Sprint',
    description: 'Quickly find if provided translation correct',
    url: '/games/sprint',
  },
  {
    img: '/assets/game-listen.png',
    title: 'Audio Challenge',
    description: 'Try to recognize the word speaker says',
    url: '/games/audiocall',
  },
];

export const GamesLinks = () => {
  const device = useDevice();
  const { isAuth, createStatistic } = useAppSelector(selectAuth);

  return (
    <Box className='vocabulary__games-links'>
      <Typography variant={headingByDeviceMap.get(device)} className='games-links__title'>
        Check your skills by playing games!
      </Typography>
      <Box className='game-cards__wrapper'>
        {isAuth && createStatistic
          ? GAMES.map((item) => (
            <AuthGameCard key={item.title} img={item.img} title={item.title} description={item.description} url={item.url} />
          ))
          : GAMES.map((item) => (
            <GameCard key={item.title} data={[]} img={item.img} title={item.title} description={item.description} url={item.url} />
          ))}
      </Box>
    </Box>
  );
};
