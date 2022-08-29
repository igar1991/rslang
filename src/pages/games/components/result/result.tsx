import { Button, Typography, Box, IconButton } from '@mui/material';
import { useAppSelector } from 'redux/hooks';
import { clearGame, selectGames } from 'redux/slices/gamesSlice';
import { useGroupColor } from 'pages/hooks';
import { VolumeUp } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';


import './result.css';

interface ResultAnswers {
  audioStartHandler: (audioFile: string)=>void
}

export const Result =({audioStartHandler}: ResultAnswers)=>{
  const { trueAnswers, falseAnswers } = useAppSelector(selectGames);
  const color = useGroupColor();
  const culc = trueAnswers.length / (trueAnswers.length + falseAnswers.length) * 100;
  const dispatch = useDispatch();
  return (
    <Box>
      <CircularProgress variant="determinate" color='success' size={50} value={culc} />

      <Button
        variant="contained"
        color="secondary"
        onClick={() => dispatch(clearGame())}
      >
        Play again
      </Button>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => console.log('go')}
      >
        To games list
      </Button>
      <Typography
        variant='h5'
        className='word-title'
      >
        {`Ошибок ${falseAnswers.length}`}
      </Typography>
      {falseAnswers.map((item)=>{
        return (
          <Box key={item.id}>
            <Typography
              variant='h6'
              className='word-title'
            >
              <IconButton
                color={color}
                aria-label="listen word pronunciation"
                onClick={() => audioStartHandler(item.audio)}
                size="large"
              >
                <VolumeUp />
              </IconButton>
              {`${item.word} - ${item.wordTranslate}`}
            </Typography>
          </Box>
        );
      })}
      <Typography
        variant='h5'
        className='word-title'
      >
        {`Знаю ${trueAnswers.length}`}
      </Typography>
      {trueAnswers.map((item)=>{
        return (
          <Box key={item.id}>
            <Typography
              variant='h6'
              className='word-title'
            >
              <IconButton
                color={color}
                aria-label="listen word pronunciation"
                onClick={() => audioStartHandler(item.audio)}
                size="large"
              >
                <VolumeUp />
              </IconButton>
              {`${item.word} - ${item.wordTranslate}`}
            </Typography>
          </Box>
        );
      })}
    </Box>
  );
};
