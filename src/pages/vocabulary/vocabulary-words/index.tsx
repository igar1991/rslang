import { Box, Pagination } from '@mui/material';
import './words.css';
import { WordsView } from './words-view';
import { useDevice, useGroupColor } from '../../hooks';
import { useDispatch } from 'react-redux';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { PAGES } from './constants';
import { Device, VocabularyTab } from '../../../types/types';
import { useAppSelector } from '../../../redux/hooks';
import { selectWords, setPage } from '../../../redux/slices/wordsSlice';

const paginationSizeByDevice: Map<string, 'medium' | 'large'> = new Map([
  [Device.DESKTOP, 'large'],
  [Device.TABLET, 'medium'],
  [Device.MOBILE, 'medium']
]);

export const VocabularyWords = () => {
  const device = useDevice();
  const color = useGroupColor();
  const { page, selectedTab } = useAppSelector(selectWords);

  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(page);
  const changePageHandler = useCallback((event: ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value - 1);
  }, [setCurrentPage]);

  useEffect(() => {
    dispatch(setPage(currentPage));
  }, [currentPage]);

  return (
    <Box className='vocabulary__words-links'>
      <WordsView isMobile={device === 'mobile'} />
      {selectedTab === VocabularyTab.VOCABULARY &&
        <Pagination
          count={PAGES}
          page={currentPage + 1}
          size={paginationSizeByDevice.get(device)}
          color={color}
          variant='text'
          onChange={changePageHandler}
        />
      }
    </Box>
  );
};
