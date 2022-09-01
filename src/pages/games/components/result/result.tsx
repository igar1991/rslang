import React, { useState } from 'react';
import { Button, Box, Link } from '@mui/material';
import { NavLink } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Slide from '@mui/material/Slide';

import ResultList from './result-list';
import { Word } from '../../../../types/types';
import './result.css';

interface ResultAnswers {
  playAgain: () => void,
  answers: { right: Word[]; errors: Word[] }
}

export const Result = ({ playAgain, answers }: ResultAnswers) => {
  const [showMore, setShowMore] = useState(false);

  const getTitle = () => {
    if (answers.right.length === 0) return 'Maybe another time...';
    const persent = (answers.right.length / (answers.right.length + answers.errors.length)) * 100;
    if (persent < 40) return 'Next time will be better!';
    if (persent < 70) return 'Not a bad result!';
    if (persent < 90) return 'Good result!';
    return 'Excellent result!';
  };

  return (
    <Box  className='result'>
      <h2 className='result__title'>{getTitle()}</h2>
      <Box className='result__container'>
        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
          <CircularProgress
            variant='determinate'
            color='success'
            className={answers.right.length === 0 ? 'result__diagramm-error' : 'result__diagramm'}
            size={150}
            value={(answers.right.length / (answers.right.length + answers.errors.length)) * 100}
            thickness={20}
          />
          <Box className='result__diagramm-text-container'>
            <p className='result__diagramm-text'>{`${answers.right.length}/${
              answers.right.length + answers.errors.length
            }`}</p>
          </Box>
        </Box>
        <Box className='result__button-container'>
          <Button variant='contained' color='secondary' onClick={playAgain}>
            Play again
          </Button>
          <Button variant='contained' color='secondary' component={NavLink} to='/games'>
            To games list
          </Button>
        </Box>
      </Box>
      <Link color='secondary' className='result__show-more-btn' onClick={() => setShowMore(!showMore)}>
        {showMore ? (
          <>
            Show less <KeyboardArrowUpIcon />
          </>
        ) : (
          <>
            Show more <KeyboardArrowDownIcon />
          </>
        )}
      </Link>
      <Slide direction='up' in={showMore} mountOnEnter unmountOnExit>
        <Box className='result__table'>
          <ResultList name='Right answers' arr={answers.right} />
          <ResultList name='Errors' arr={answers.errors} />
          <ResultList name='New words' arr={answers.right}/>
        </Box>
      </Slide>
    </Box>
  );
};
