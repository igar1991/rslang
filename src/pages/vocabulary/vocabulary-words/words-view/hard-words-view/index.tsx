import { Box } from '@mui/material';
import { WordsList } from '../words-list';
import { wordsAPI } from 'api/wordsService';
import { useAppSelector } from 'redux/hooks';
import { selectAuth } from 'redux/slices/authUserSlice';
import { WORDS_PER_PAGE } from '../../constants';
import { AuthWordDetailsCard } from '../../word-details-card/auth-word-details-card';
import '../words-view.css';

interface ViewProps {
  isMobile: boolean;
}

export const HardWordsView = ({ isMobile }: ViewProps) => {
  const { id: userId } = useAppSelector(selectAuth);
  const { data, isSuccess } = wordsAPI.useGetAllAggregatedWordsQuery({
    id: userId,
    wordsPerPage: WORDS_PER_PAGE,
    filter: '{"userWord.difficulty":"hard"}',
  });
  return isSuccess ? (
    <Box className='words'>
      {isMobile ? (
        <>
          <AuthWordDetailsCard />
          <WordsList
            data={data[0].paginatedResults.map((word) => ({ ...word, id: word._id }))}
            isSuccess={isSuccess}
            hardView
            usersWords={[]}
          />
        </>
      ) : (
        <>
          <Box className='words__words-column'>
            <WordsList
              data={data[0].paginatedResults.map((word) => ({ ...word, id: word._id }))}
              isSuccess={isSuccess}
              hardView
              usersWords={[]}
            />
          </Box>
          <AuthWordDetailsCard />
        </>
      )}
    </Box>
  ) : null;
};
