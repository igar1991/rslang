import { Box } from '@mui/material';
import { WordDetailsCard } from '../word-details-card';
import { WordsLevels } from './words-levels';
import { WordsList } from './words-list';
import './words-view.css';
import { useAppSelector } from '../../../../redux/hooks';
import { getWordsData } from './utils';

interface ViewProps {
  isMobile: boolean;
}

export const WordsView = ({ isMobile }: ViewProps) => {
  const selectedWordId = useAppSelector((state) => state.words.selectedWordId);
  const { data, isSuccess } = getWordsData();

  return (
    <Box className='words'>
      {isMobile ? (
        <>
          <WordsLevels />
          <WordDetailsCard
            id={selectedWordId}
          />
          <WordsList
            data={data}
            isSuccess={isSuccess}
          />
        </>
      ) : (
        <>
          <Box className='words__words-column'>
            <WordsLevels />
            <WordsList
              data={data}
              isSuccess={isSuccess}
            />
          </Box>
          <WordDetailsCard
            id={selectedWordId}
          />
        </>
      )}
    </Box>
  );
};
