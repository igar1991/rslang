import { Button } from '@mui/material';

interface Props {
  handleClick: () => void;
  title: string
}

export const DetailsCardButton = ({ handleClick, title }: Props) => {
  return (
    <Button
      variant='contained'
      color='secondary'
      size='small'
      className='details-card-button'
      onClick={handleClick}
    >
      {title}
    </Button>
  );
};
