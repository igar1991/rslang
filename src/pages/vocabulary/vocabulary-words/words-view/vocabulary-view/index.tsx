import { Box } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { getVocabularyWordsData } from '../../../utils';
import { setGroup } from 'redux/slices/wordsSlice';
import { WordsLevels } from '../words-levels';
import { WordDetailsCard } from '../../word-details-card';
import { WordsList } from '../words-list';
import '../words-view.css';

interface ViewProps {
  isMobile: boolean;
}

export const VocabularyView = ({ isMobile }: ViewProps) => {
  const { data, isSuccess } = getVocabularyWordsData();

  const dispatch = useDispatch();
  const onClickHandler = useCallback((group: number) => {
    dispatch(setGroup(group));
  }, [dispatch]);

  return isSuccess ? (
    <Box className='words'>
      {isMobile ? (
        <>
          <WordsLevels onClickHandler={onClickHandler} />
          <WordDetailsCard />
          <WordsList
            data={data}
            isSuccess={isSuccess}
          />
        </>
      ) : (
        <>
          <Box className='words__words-column'>
            <WordsLevels onClickHandler={onClickHandler} />
            <WordsList
              data={data}
              isSuccess={isSuccess}
            />
          </Box>
          <WordDetailsCard />
        </>
      )}
    </Box>
  ) : null;
};
