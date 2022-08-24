import { Box } from '@mui/material';
import { LevelButton } from './level-button';
import './levels.css';
import { LEVELS } from '../../constants';

export const WordsLevels = () => (
  <Box className='words__levels'>
    {LEVELS.map((level, index) => <LevelButton
      key={level}
      buttonName={level}
      group={index}
    />)}
  </Box>
);
