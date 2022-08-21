import { Button } from '@mui/material';
import './levels.css';

interface Props {
  buttonName: string;
}

export const LevelButton = ({ buttonName }: Props) => {
  return (
    <Button
      variant='outlined'
      color='secondary'
      className='level-button'
    >
      {buttonName}
    </Button>
  );
};
