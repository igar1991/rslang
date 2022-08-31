import { Box } from '@mui/material';
import { WordDetailsCard } from '../../word-details-card';
import { WordsList } from '../words-list';
import { wordsAPI } from 'api/wordsService';
import { useAppSelector } from 'redux/hooks';
import { selectAuth } from 'redux/slices/authUserSlice';
import { HARD_WORDS_PER_PAGE } from '../../constants';
import '../words-view.css';

interface ViewProps {
  isMobile: boolean;
}

export const HardWordsView = ({ isMobile }: ViewProps) => {
  const { id: userId } = useAppSelector(selectAuth);
  const { data, isSuccess } = wordsAPI.useGetAllAggregatedWordsQuery({
    id: userId,
    wordsPerPage: HARD_WORDS_PER_PAGE,
    filter: '{"userWord.difficulty":"hard"}'
  });

  return isSuccess ? (
    <Box className='words'>
      {isMobile ? (
        <>
          <WordDetailsCard />
          <WordsList
            data={data[0].paginatedResults.map((word) => ({ ...word, id: word._id }))}
            isSuccess={isSuccess}
            hardView
          />
        </>
      ) : (
        <>
          <Box className='words__words-column'>
            <WordsList
              data={data[0].paginatedResults.map((word) => ({ ...word, id: word._id }))}
              isSuccess={isSuccess}
              hardView
            />
          </Box>
          <WordDetailsCard />
        </>
      )}
    </Box>
  ) : null;
};
