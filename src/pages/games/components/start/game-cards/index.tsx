import React from 'react';
import { NavLink } from 'react-router-dom';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import { Box } from '@mui/material';

import './games-card.css';

type GameCardsType = {
  game: {
    name: string;
    img: string;
    description: string;
    url: string;
  };
};

export function GamesCards({ game }: GameCardsType): JSX.Element {
  return (
    <Box component={NavLink} to={game.url} className='games__card'>
      <CardMedia
        component='img'
        className='games__card-img'
        image={game.img}
        alt={game.name}
      />
      <CardContent>
        <h3 className='games__card-title'>{game.name}</h3>
        <p className='games__card-description'>{game.description}</p>
      </CardContent>
    </Box>
  );
}
