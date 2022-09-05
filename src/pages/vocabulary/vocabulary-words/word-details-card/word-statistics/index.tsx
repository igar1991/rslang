import { Box, Typography } from '@mui/material';
import { wordsAPI } from 'api/wordsService';
import { Device } from 'types/types';
import {
  StyledWordStatistics
} from 'pages/vocabulary/vocabulary-words/word-details-card/word-statistics/StyledWordStatistics';
import { Colors } from 'pages/vocabulary/vocabulary-words/words-view/words-levels/constants';

interface WordStatisticsProps {
  device: string;
  color: Colors;
  wordId: string;
  userId: string;
}

export const DetailsCardStatistics = ({ device, color, userId, wordId }: WordStatisticsProps) => {
  const { data: userWords, isSuccess } = wordsAPI.useGetUserWordsQuery(userId);

  const selectedWord = userWords?.find(item => item.wordId === wordId);

  const correctAnswersCount = selectedWord?.optional.games?.answers?.filter((value) => !!value).length || 0;
  const failedAnswersCount = selectedWord?.optional.games?.answers?.filter((value) => !value).length || 0;

  return (
    <StyledWordStatistics
      className='word__details-card_statistics'
      color={color}
    >
      <Typography
        variant={device === Device.DESKTOP ? 'body1' : 'body2'}
        className='word-subtitle'
      >
        Mini-games progress:
      </Typography>
      {isSuccess ? (
        <Box className='word__details-card_statistics-details'>
          <Typography variant={device === Device.DESKTOP ? 'body1' : 'body2'}>
            {`Correct: ${correctAnswersCount}`}
          </Typography>
          <Typography variant={device === Device.DESKTOP ? 'body1' : 'body2'}>
            {`Errors: ${failedAnswersCount}`}
          </Typography>
        </Box>
      ) : (
        <Box className='word__details-card_statistics-details'>
          <Typography variant={device === Device.DESKTOP ? 'body1' : 'body2'}>
            {'Correct: 0'}
          </Typography>
          <Typography variant={device === Device.DESKTOP ? 'body1' : 'body2'}>
            {'Errors: 0'}
          </Typography>
        </Box>
      )}
    </StyledWordStatistics>
  );
};
