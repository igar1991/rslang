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
      {data?.map((currentWord, index) => (
        <WordCard
          key={index}
          word={currentWord.word}
          translation={currentWord.wordTranslate}
          id={currentWord.id}
        />
      ))}
    </Box>
  ) : null;
};
