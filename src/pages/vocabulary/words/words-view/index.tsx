import { Box } from '@mui/material';
import { WordDetailsCard } from '../word-details-card';
import { WordsLevels } from './words-levels';
import { WordsList } from './words-list';
import './words-view.css';
import { useAppSelector } from '../../../../redux/hooks';

interface ViewProps {
  isMobile: boolean;
}

export const WordsView = ({ isMobile }: ViewProps) => {
  const group = useAppSelector((state) => state.words.group);
  const page = useAppSelector((state) => state.words.page);
  const selectedWordId = useAppSelector((state) => state.words.selectedWordId);

  return (
    <Box className='words'>
      {isMobile ? (
        <>
          <WordsLevels />
          <WordDetailsCard id={selectedWordId} />
          <WordsList group={group} page={page} />
        </>
      ) : (
        <>
          <Box className='words__words-column'>
            <WordsLevels />
            <WordsList group={group} page={page} />
          </Box>
          <WordDetailsCard id={selectedWordId} />
        </>
      )}
    </Box>
  );
};
