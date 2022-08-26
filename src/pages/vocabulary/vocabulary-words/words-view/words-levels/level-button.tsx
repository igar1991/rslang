import { Button } from '@mui/material';
import './levels.css';
import { useDispatch } from 'react-redux';
import { setGroup } from '../../../../../redux/slices/wordsSlice';
import { useCallback } from 'react';
import { Colors, ColorsByGroupMap } from './constants';
import { LEVELS } from '../../constants';

interface Props {
  level: LEVELS;
  group: number;
}

export const LevelButton = ({ level, group }: Props) => {
  const dispatch = useDispatch();
  const onClickHandler = useCallback(() => {
    return dispatch(setGroup(group));
  }, []);
  const color = ColorsByGroupMap.get(level) as Colors;

  return (
    <Button
      variant='contained'
      color={color}
      className='level-button'
      onClick={onClickHandler}
    >
      {level}
    </Button>
  );
};
