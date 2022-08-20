import { Box, Pagination } from '@mui/material';
import './words.css';
import { WordsView } from './words-view';
import { useDevice } from '../../hooks';

const paginationSizeByDevice: Map<string, 'medium' | 'large'> = new Map([
  ['desktop', 'large'],
  ['tablet', 'medium'],
  ['mobile', 'medium'],
]);

export const Words = () => {
  const device = useDevice();

  return (
    <Box className='vocabulary__words-links'>
      <WordsView isMobile={device === 'mobile'} />
      <Pagination
        count={30}
        size={paginationSizeByDevice.get(device)}
        color='secondary'
        variant='outlined'
      />
    </Box>
  );
};
