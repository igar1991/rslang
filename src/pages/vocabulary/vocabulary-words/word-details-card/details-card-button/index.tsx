import { Button } from '@mui/material';
import { useGroupColor } from '../../../../hooks';

interface Props {
  handleClick: () => void;
  title: string
}

export const DetailsCardButton = ({ handleClick, title }: Props) => {
  const color = useGroupColor();

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
