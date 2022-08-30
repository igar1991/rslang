import { Box } from '@mui/material';
import { WordCard } from './word-card';
import './list.css';
import { Word } from '../../../../../types/types';
import { DIFFICULTY } from '../../constants';
import { useAppSelector } from '../../../../../redux/hooks';
import { selectAuth } from '../../../../../redux/slices/authUserSlice';
import { wordsAPI } from '../../../../../api/wordsService';

interface WordsProps {
  data: Word[] | undefined;
  isSuccess: boolean;
  hardView?: boolean;
}

export const WordsList = ({ data, isSuccess, hardView }: WordsProps) => {
  const { id: userId } = useAppSelector(selectAuth);
  const { data: usersWords, isSuccess: isUserWordsLoaded } = wordsAPI.useGetUserWordsQuery(userId);

  const usersHardWordsIds = isUserWordsLoaded ? usersWords
    .reduce((acc, word) => {
      if (word.difficulty === DIFFICULTY.HARD) {
        acc.push(word.wordId);
      }

      return acc;
    }, [] as string[]): [];

  return isSuccess ? (
    <Box className='words__words-list'>
      {data?.map((currentWord) => {
        const isHardWord = usersHardWordsIds.includes(currentWord.id);

        return (
          <WordCard
            key={hardView ? `hard-${(currentWord.id)}` : `vocabulary-${currentWord.id}`}
            word={currentWord}
            isHardWord={isHardWord}
          />
        );
      })}
    </Box>
  ) : null;
};
