import { Button } from '@mui/material';
import './levels.css';
import { useDispatch } from 'react-redux';
import { setGroup } from '../../../../../redux/slices/wordsSlice';
import { useCallback } from 'react';

interface Props {
  buttonName: string;
  group: number;
}

export const LevelButton = ({ buttonName, group }: Props) => {
  const dispatch = useDispatch();
  const onClickHandler = useCallback(() => {
    return dispatch(setGroup(group));
  }, []);

  return (
    <Button
      variant='outlined'
      color='secondary'
      className='level-button'
      onClick={onClickHandler}
    >
      {buttonName}
    </Button>
  );
};
