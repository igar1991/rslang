import { Button } from '@mui/material';
import { Colors } from '../../words-view/words-levels/constants';

interface Props {
  handleClick: () => void;
  color: Colors;
  title: string
}

export const DetailsCardButton = ({ handleClick, color, title }: Props) => {
  return (
    <Button
      variant='contained'
      color={color}
      size='small'
      className='details-card-button'
      onClick={handleClick}
    >
      {title}
    </Button>
  );
};
