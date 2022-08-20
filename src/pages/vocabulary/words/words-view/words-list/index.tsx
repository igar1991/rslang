import { Box } from '@mui/material';
import { WordCard } from './word-card';
import { WORDS_PER_PAGE } from './constants';
import './list.css';

export const WordsList = () => {
  return (
    <Box className='words__words-list'>
      {[...Array(WORDS_PER_PAGE)].map((word, index) => <WordCard key={index} />)}
    </Box>
  );
};
