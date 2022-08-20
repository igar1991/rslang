import { Box, Button } from '@mui/material';
import './game-card.css';
import { CardDescription } from './card-description';
import { useDevice } from '../../../hooks';

interface Props {
  img: string;
  title: string;
  description: string;
}

const buttonSizeByDevice: Map<string, 'medium' | 'small'> = new Map([
  ['desktop', 'medium'],
  ['tablet', 'small'],
  ['mobile', 'small'],
]);

export const GameCard = ({ img, title, description }: Props) => {
  const device = useDevice();

  return (
    <Box className='game__card'>
      <CardDescription
        img={img}
        title={title}
        description={description}
      />
      <Button
        variant='contained'
        color='secondary'
        size={buttonSizeByDevice.get(device)}
        className='game__card-button'
      >
        Start Playing
      </Button>
    </Box>
  );
};
