import { styled } from '@mui/material';
import { Colors } from 'pages/vocabulary/vocabulary-words/words-view/words-levels/constants';

interface StyledWordStatisticsProps {
  color: Colors;
}

export const StyledWordStatistics = styled('div')<StyledWordStatisticsProps>(
  ({ theme, color }) => ({
    backgroundColor: theme.palette[color].main,
    padding: '0.5rem',
    borderRadius: '5px',
    color: 'white',
  }));
