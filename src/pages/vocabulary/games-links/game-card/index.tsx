import { Box, Button } from '@mui/material';
import './game-card.css';
import { CardDescription } from './card-description';
import { useDevice, useLearnedWordsData } from 'pages/hooks';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { useNavigate } from 'react-router-dom';
import { setFromVoc, setGroup, setPage } from 'redux/slices/gamesSlice';
import { selectWords } from 'redux/slices/wordsSlice';
import { selectAuth } from 'redux/slices/authUserSlice';

interface Props {
  img: string;
  title: string;
  description: string;
  url: string;
}

const buttonSizeByDevice: Map<string, 'medium' | 'small'> = new Map([
  ['desktop', 'medium'],
  ['tablet', 'small'],
  ['mobile', 'small']
]);

export const GameCard = ({ img, title, description, url }: Props) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const device = useDevice();
  const data = useLearnedWordsData();

  const { page, group } = useAppSelector(selectWords);
  const { isAuth } = useAppSelector(selectAuth);

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
        disabled={isAuth && data && data.length === 20}
      >
        Start Playing
      </Button>
    </Box>
  );
};
