import { Box } from '@mui/material';
import { WordCard } from './word-card';
import './list.css';
import { Word } from '../../../../../types/types';

interface WordsProps {
  data: Word[] | undefined;
  isSuccess: boolean;
}

export const WordsList = ({ data, isSuccess }: WordsProps) => {
  return isSuccess ? (
    <Box className='words__words-list'>
      {data?.map((currentWord) => (
        <WordCard
          key={currentWord.id}
          word={currentWord}
        />
      ))}
    </Box>
  ) : null;
};
