import { Device } from 'types/types';
import { useLayoutEffect, useState } from 'react';
import { useAppSelector } from 'redux/hooks';
import { Colors, ColorsByGroupMap } from '../vocabulary/vocabulary-words/words-view/words-levels/constants';
import { GROUPS, WORDS_PER_PAGE } from '../vocabulary/vocabulary-words/constants';
import { selectAuth } from 'redux/slices/authUserSlice';
import { wordsAPI } from 'api/wordsService';
import { selectWords } from 'redux/slices/wordsSlice';

export const useDevice = () => {
  const [width, setWidth] = useState(0);

  const updateWidth = () => {
    setWidth(window.innerWidth);
  };

  useLayoutEffect(() => {
    window.addEventListener('resize', updateWidth);

    updateWidth();

    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  if (width > 900) {
    return Device.DESKTOP;
  }

  if (width > 600) {
    return Device.TABLET;
  }

  return Device.MOBILE;
};

export const useGroupColor = () => {
  const selectedGroup = useAppSelector((state) => state.words.group);

  return ColorsByGroupMap.get(GROUPS[selectedGroup]) as Colors;
};

export const useLearnedWordsData = () => {
  const { id } = useAppSelector(selectAuth);
  const { page, group } = useAppSelector(selectWords);
  
  const { data: usersWords, isSuccess: isUserWordsLoaded } = wordsAPI.useGetUserWordsQuery(id);

  const { data } = wordsAPI.useGetAllAggregatedWordsQuery({
    id,
    wordsPerPage: WORDS_PER_PAGE,
    filter: '{"userWord.optional.learned":true}',
  });

  const filteredData =
    data &&
    isUserWordsLoaded &&
    data[0].paginatedResults.filter(({ page: wordPage, group: wordGroup }) => wordPage === page && wordGroup === group);

  return { data: filteredData, usersWords: usersWords };
};
