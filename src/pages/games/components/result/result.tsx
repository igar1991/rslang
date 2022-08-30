import { useState } from 'react';
import { Button, Box, Link } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../../../../redux/hooks';
import { clearGame, selectGames } from '../../../../redux/slices/gamesSlice';
import { useDispatch } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import ResultList from './result-list';
import './result.css';
import React from 'react';

interface ResultAnswers {
  audioStartHandler: (audioFile: string) => void;
}

export const Result = ({ audioStartHandler }: ResultAnswers) => {
  const { trueAnswers, falseAnswers } = useAppSelector(selectGames);

  const [showMore, setShowMore] = useState(false);
  const dispatch = useDispatch();
  
  const getTitle = () => {
    if (trueAnswers.length === 0) return 'Maybe another time...';
    const persent = (trueAnswers.length / (trueAnswers.length + falseAnswers.length)) * 100;
    if (persent < 40) return 'Next time will be better!';
    if (persent < 70) return 'Not a bad result!';
    return 'Excellent result!';
  };

  return (
    <Box>
      <h2 className='result__title'>{getTitle()}</h2>
      <Box className='result__container'>
        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
          <CircularProgress
            variant='determinate'
            color={trueAnswers.length === 0 ? 'error' : 'success'}
            className='result__diagramm'
            size={150}
            value={(trueAnswers.length / (trueAnswers.length + falseAnswers.length)) * 100}
            thickness={20}
          />
          <Box className='result__diagramm-text-container'>
            <p className='result__diagramm-text'>{`${trueAnswers.length}/${trueAnswers.length + falseAnswers.length}`}</p>
          </Box>
        </Box>
        <Box className='result__button-container'>
          <Button
            variant='contained'
            color='secondary'
            onClick={() => dispatch(clearGame())}
          >
            Play again
          </Button>
          <Button
            variant='contained'
            color='secondary'
            component={NavLink}
            to='/games'
          >
            To games list
          </Button>
        </Box>
      </Box>
      <Link
        color='secondary'
        className='result__show-more-btn'
        onClick={() => setShowMore(!showMore)}
      >
        {showMore ? <>Show less <KeyboardArrowUpIcon /></>  : <>Show more <KeyboardArrowDownIcon /></> }
      </Link>
      
      {showMore ? 
        <Box className='result__table'>
          <ResultList name='Right answers' arr={trueAnswers} audioStartHandler={audioStartHandler} />
          <ResultList name='Errors' arr={falseAnswers} audioStartHandler={audioStartHandler} />
          <ResultList name='New words' arr={trueAnswers} audioStartHandler={audioStartHandler} />
        </Box> : ''}
    </Box>
  );
};
