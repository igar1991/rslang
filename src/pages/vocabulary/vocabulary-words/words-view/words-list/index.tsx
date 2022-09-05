import { Box } from '@mui/material';
import { WordCard } from './word-card';
import './list.css';
import { UserWordData, Word } from 'types/types';
import { DIFFICULTY } from '../../constants';
import { useAppSelector } from 'redux/hooks';
import { selectAuth } from 'redux/slices/authUserSlice';
import { wordsAPI } from 'api/wordsService';

interface WordsProps {
  data: Word[] | undefined;
  isSuccess: boolean;
  usersWords: UserWordData[];
  hardView?: boolean;
}

export const WordsList = ({ data, isSuccess, usersWords, hardView }: WordsProps) => {
  const usersHardWordsIds = usersWords.length > 0 ? usersWords
    .reduce((acc, word) => {
      if (word.difficulty === DIFFICULTY.HARD) {
        acc.push(word.wordId);
      }

      return acc;
    }, [] as string[]): [];

  const usersLearnedWordsIds = usersWords.length > 0  ? usersWords
    .reduce((acc, word) => {
      if (word.optional.learned) {
        acc.push(word.wordId);
      }

      return acc;
    }, [] as string[]): [];

  return isSuccess ? (
    <Box className='words__words-list'>
      {data?.map((currentWord) => {
        const isHardWord = usersHardWordsIds.includes(currentWord.id);
        const isLearnedWord = usersLearnedWordsIds.includes(currentWord.id);

        return (
          <WordCard
            key={hardView ? `hard-${(currentWord.id)}` : `vocabulary-${currentWord.id}`}
            word={currentWord}
            isHardWord={isHardWord}
            isLearnedWord={isLearnedWord}
          />
        );
      })}
    </Box>
  ) : null;
};
