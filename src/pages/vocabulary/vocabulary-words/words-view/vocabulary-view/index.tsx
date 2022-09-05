import { Box } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { useVocabularyWordsData } from '../../../utils';
import { setGroup } from 'redux/slices/wordsSlice';
import { WordsLevels } from '../words-levels';
import { WordDetailsCard } from '../../word-details-card';
import { WordsList } from '../words-list';
import { useAppSelector } from 'redux/hooks';
import { selectAuth } from 'redux/slices/authUserSlice';
import { AuthWordList } from '../words-list/auth-word-list';
import { AuthWordDetailsCard } from '../../word-details-card/auth-word-details-card';
import '../words-view.css';

interface ViewProps {
  isMobile: boolean;
}

export const VocabularyView = ({ isMobile }: ViewProps) => {
  const { data, isSuccess } = useVocabularyWordsData();
  const { isAuth } = useAppSelector(selectAuth);

  const dispatch = useDispatch();
  const onClickHandler = useCallback(
    (group: number) => {
      dispatch(setGroup(group));
    },
    [dispatch]
  );

  return isSuccess ? (
    <Box className='words'>
      {isMobile ? (
        <>
          <WordsLevels onClickHandler={onClickHandler} />
          {isAuth ? (
            <>
              <AuthWordDetailsCard />
              <AuthWordList data={data} isSuccess={isSuccess} />
            </>
          ) : (
            <>
              <WordDetailsCard data={undefined} usersWords={undefined} userStatistics={undefined} />
              <WordsList data={data} isSuccess={isSuccess} usersWords={undefined} />
            </>
          )}
        </>
      ) : (
        <>
          <Box className='words__words-column'>
            <WordsLevels onClickHandler={onClickHandler} />
            {isAuth ? (
              <AuthWordList data={data} isSuccess={isSuccess} />
            ) : (
              <WordsList data={data} isSuccess={isSuccess} usersWords={undefined} />
            )}
          </Box>
          {isAuth ? <AuthWordDetailsCard /> : <WordDetailsCard data={undefined} usersWords={undefined} userStatistics={undefined} />}
        </>
      )}
    </Box>
  ) : null;
};
