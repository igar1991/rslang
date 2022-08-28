import { Box } from '@mui/material';
import { WordDetailsCard } from '../word-details-card';
import { WordsLevels } from './words-levels';
import { WordsList } from './words-list';
import './words-view.css';
import { useAppSelector } from '../../../../redux/hooks';
import { useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { setGroup } from '../../../../redux/slices/wordsSlice';
import { getWordsData } from '../../utils';
import { wordsAPI } from '../../../../api/wordsService';

interface ViewProps {
  isMobile: boolean;
}

export const WordsView = ({ isMobile }: ViewProps) => {
  const selectedWordId = useAppSelector((state) => state.words.selectedWordId);
  const { data: word, isSuccess: isWordLoaded } = wordsAPI.useGetWordByIdQuery(selectedWordId);
  const { data, isSuccess } = getWordsData();
  const dispatch = useDispatch();
  const onClickHandler = useCallback((group: number) => {
    dispatch(setGroup(group));
  }, [dispatch]);

  return (
    <Box className='words'>
      {isMobile ? (
        <>
          <WordsLevels onClickHandler={onClickHandler} />
          {isWordLoaded ?
            <WordDetailsCard
              word={word}
            /> : null
          }
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
          {isWordLoaded ?
            <WordDetailsCard
              word={word}
            /> : null
          }
        </>
      )}
    </Box>
  );
};
