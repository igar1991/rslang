import { Box } from '@mui/material';
import { LevelButton } from './level-button';
import './levels.css';
import { GROUPS } from '../../constants';

export const WordsLevels = ({ onClickHandler }: { onClickHandler: (group: number) => void }) => (
  <Box className='words__levels'>
    {GROUPS.map((level, index) => <LevelButton
      key={level}
      level={level}
      group={index}
      onClickHandler={onClickHandler}
    />)}
  </Box>
);
