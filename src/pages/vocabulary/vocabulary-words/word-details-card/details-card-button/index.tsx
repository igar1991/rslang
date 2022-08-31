import { Button } from '@mui/material';
import { Colors } from '../../words-view/words-levels/constants';

interface Props {
  handleClick: () => void;
  color: Colors;
  title: string;
  disabled: boolean;
}

export const DetailsCardButton = ({ handleClick, color, title, disabled }: Props) => {
  return (
    <Button
      variant='contained'
      color={color}
      size='small'
      className='details-card-button'
      onClick={handleClick}
      disabled={disabled}
    >
      {title}
    </Button>
  );
};
