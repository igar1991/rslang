import React from 'react';
import { Box, Typography } from '@mui/material';
import '../../../vocabulary/games-links/games-link.css';

interface AchievementProps {
  name: string;
  description: string;
  image: string;
  achieved: boolean;
}

export const AchievementCard = ({ name, description, image, achieved }: AchievementProps) => {
  return (
    <Box className={achieved ? 'achievement-card': 'achievement-card disabled'}>
      <Box className='achievement-card-wrapper'>
        <Box
          component='img'
          src={image}
          sx={{
            height: {
              xs: 80,
              md: 100
            }
          }}
        />
        <Box className='achievement-card__description'>
          <Typography
            variant='h6'
            className='game-title'
          >
            {name}
          </Typography>
          <Typography
            variant='body1'
            className='game-description'
          >
            {description}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
