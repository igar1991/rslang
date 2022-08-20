import { Box } from '@mui/material';
import { WordDetailsCard } from '../word-details-card';
import { WordsLevels } from './words-levels';
import { WordsList } from './words-list';
import './words-view.css';

interface ViewProps {
  isMobile: boolean;
}

export const WordsView = ({ isMobile }: ViewProps) => {
  return (
    <Box className='words'>
      {isMobile ? (
        <>
          <WordsLevels />
          <WordDetailsCard />
          <WordsList />
        </>
      ) : (
        <>
          <Box className='words__words-column'>
            <WordsLevels />
            <WordsList />
          </Box>
          <WordDetailsCard />
        </>
      )}
    </Box>
  );
};
