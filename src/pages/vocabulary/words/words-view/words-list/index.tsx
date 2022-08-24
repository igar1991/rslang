import { Box } from '@mui/material';
import { WordCard } from './word-card';
import { wordsAPI } from '../../../../../api/wordsService';
import './list.css';

interface WordsProps {
  page: number;
  group: number;
}

export const WordsList = ({ page, group }: WordsProps) => {
  const { data, isSuccess } = wordsAPI.useGetWordsQuery({ page, group });

  return isSuccess ? (
    <Box className='words__words-list'>
      {data.map((currentWord, index) => (
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
