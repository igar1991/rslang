import { Button } from '@mui/material';
import './levels.css';
import { Colors, ColorsByGroupMap } from './constants';
import { LEVELS } from '../../constants';

interface Props {
  level: LEVELS;
  group: number;
  onClickHandler: (group: number) => void;
}

export const LevelButton = ({ level, group, onClickHandler }: Props) => {
  const color = ColorsByGroupMap.get(level) as Colors;

  return (
    <Button
      variant='contained'
      color={color}
      className='level-button'
      onClick={() => onClickHandler(group)}
    >
      {level}
    </Button>
  );
};
