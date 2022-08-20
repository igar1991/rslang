import { Box } from '@mui/material';
import { LevelButton } from './level-button';
import './levels.css';

export const WordsLevels = () => {
  return (
    <Box className='words__levels'>
      <LevelButton buttonName='A1' />
      <LevelButton buttonName='A2' />
      <LevelButton buttonName='B1' />
      <LevelButton buttonName='B2' />
      <LevelButton buttonName='C1' />
      <LevelButton buttonName='C2' />
    </Box>
  );
};
