import { Box, Button } from '@mui/material';
import './game-card.css';
import { CardDescription } from './card-description';
import { useDevice } from 'pages/hooks';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { useNavigate } from 'react-router-dom';
import { setFromVoc, setGroup, setPage } from 'redux/slices/gamesSlice';
import { selectWords } from 'redux/slices/wordsSlice';

interface Props {
  img: string;
  title: string;
  description: string;
  url: string
}

const buttonSizeByDevice: Map<string, 'medium' | 'small'> = new Map([
  ['desktop', 'medium'],
  ['tablet', 'small'],
  ['mobile', 'small'],
]);

export const GameCard = ({ img, title, description, url }: Props) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const device = useDevice();

  const { page, group } = useAppSelector(selectWords);

  const onStartGame = () => {
    dispatch(setPage(page));
    dispatch(setGroup(group));
    dispatch(setFromVoc(true));
    navigate(url);
  };

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
        onClick={onStartGame}
      >
        Start Playing
      </Button>
    </Box>
  );
};
