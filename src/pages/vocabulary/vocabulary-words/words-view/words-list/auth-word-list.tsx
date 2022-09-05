import { CircularProgress, Stack } from '@mui/material';
import { wordsAPI } from 'api/wordsService';
import { useAppSelector } from 'redux/hooks';
import { selectAuth } from 'redux/slices/authUserSlice';
import { Word } from 'types/types';
import { WordsList } from '.';

interface WordsProps {
  data: Word[] | undefined;
  isSuccess: boolean;
}

export const AuthWordList = ({data, isSuccess}: WordsProps) => {
  const { id: userId } = useAppSelector(selectAuth);
  const { data: usersWords, isSuccess: isUserWordsLoaded } = wordsAPI.useGetUserWordsQuery(userId);

  return isUserWordsLoaded ? (
    <WordsList data={data} isSuccess={isSuccess} usersWords={usersWords} />
  ) : (
    <Stack sx={{ color: 'grey.500' }} spacing={2} direction='row'>
      <CircularProgress color='secondary' />
    </Stack>
  );
};
