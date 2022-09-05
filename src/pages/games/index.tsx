import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from 'redux/hooks';
import { Alert, Box, Container, Button } from '@mui/material';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';
import Snackbar from '@mui/material/Snackbar';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import { setFromVoc, setGroup, setPage } from 'redux/slices/gamesSlice';
import { Background } from 'pages/games/components/background';

import { GAMES, LEVELS } from 'pages/games/constants';
import 'pages/games/games.css';

export default function Games(): JSX.Element {
  const [selectedGame, setSelectedGame] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [errorMessage, setErrorMessage] = useState({ show: false, message: '' });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSelectGame = (event: React.MouseEvent<HTMLElement>, newAlignment: string) => {
    setSelectedGame(newAlignment);
  };

  const onSelectLevel = (event: React.MouseEvent<HTMLElement>, newAlignment: string) => {
    setSelectedLevel(newAlignment);
    if (newAlignment) {
      dispatch(setPage(Math.floor(Math.random() * 30)));
      dispatch(setGroup(+newAlignment - 1));
    }
  };

  const onStartGame = () => {
    dispatch(setFromVoc(false));
    if (selectedGame && selectedLevel) return navigate(selectedGame);
    if (!selectedGame && !selectedLevel) return setErrorMessage({ show: true, message: 'Select game and level' });
    if (!selectedGame) return setErrorMessage({ show: true, message: 'Select game' });
    if (!selectedLevel) return setErrorMessage({ show: true, message: 'Select level' });
  };

  const onCloseError = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setErrorMessage({ show: false, message: '' });
  };

  return (
    <Container component='main' className='games__container'>
      <h2 className='games__title'>Check your skills by playing games!</h2>
      <Box className='games__selected-container'>
        <ToggleButtonGroup
          value={selectedGame}
          onChange={onSelectGame}
          exclusive={true}
          className='games__cards'
          color='secondary'
        >
          {GAMES.map((game) => (
            <ToggleButton className='games__card' value={game.url} key={game.url}>
              <CardMedia component='img' className='games__card-img' image={game.img} alt={game.name} />
              <CardContent className='games__card-text'>
                <h3 className='games__card-title'>{game.name}</h3>
                <p className='games__card-description'>{game.description}</p>
              </CardContent>
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
        <ToggleButtonGroup
          value={selectedLevel}
          onChange={onSelectLevel}
          exclusive={true}
          className='games__buttons'
          color='secondary'
        >
          {LEVELS.map((level) => (
            <ToggleButton className='games__button' value={level.id} key={level.id}>
              {level.name}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Box>
      <Button variant='contained' color='secondary' className='games__start-btn' onClick={onStartGame}>
        Start
      </Button>
      <Background word='LANGLISH' />
      <Snackbar open={errorMessage.show} autoHideDuration={4000} onClose={onCloseError}>
        <Alert onClose={onCloseError} severity='error' variant='filled'>
          {errorMessage.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}
