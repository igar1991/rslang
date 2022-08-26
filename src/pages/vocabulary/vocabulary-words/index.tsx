import { Box, Pagination } from '@mui/material';
import './words.css';
import { WordsView } from './words-view';
import { useDevice, useGroupColor } from '../../hooks';
import { useDispatch } from 'react-redux';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { setPage } from '../../../redux/slices/wordsSlice';
import { PAGES } from './constants';
import { Device } from '../../../types/types';

const paginationSizeByDevice: Map<string, 'medium' | 'large'> = new Map([
  [Device.DESKTOP, 'large'],
  [Device.TABLET, 'medium'],
  [Device.MOBILE, 'medium']
]);

export const VocabularyWords = () => {
  const device = useDevice();
  const color = useGroupColor();

  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(0);
  const changePageHandler = useCallback((event: ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value - 1);
  }, [setCurrentPage]);

  useEffect(() => {
    dispatch(setPage(currentPage));
  }, [currentPage]);

  return (
    <Box className='vocabulary__words-links'>
      <WordsView isMobile={device === 'mobile'} />
      <Pagination
        count={PAGES}
        page={currentPage + 1}
        size={paginationSizeByDevice.get(device)}
        color={color}
        variant='text'
        onChange={changePageHandler}
      />
    </Box>
  );
};
