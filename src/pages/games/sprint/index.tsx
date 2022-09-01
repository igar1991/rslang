import { useCallback, useEffect, useState } from 'react';
import { Button, Box, Rating, Grow } from '@mui/material';
import { Container } from '@mui/system';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { setPage, selectGames } from 'redux/slices/gamesSlice';
import { wordsAPI } from 'api/wordsService';
import { Word } from 'types/types';
import { Result } from 'pages/games/components/result/result';
import { Background } from 'pages/games/components/background';

import 'pages/games/sprint/sprint.css';
import { POINTS, SERIES_LENGTH, SPRINT_SECONDS } from '../constants';
import { getArraySprint } from '../utils';

type QuestionsType = {
  word: Word;
  answer: string;
  translate: string;
};

export default function Sprint() {
  const dispatch = useAppDispatch();
  const { page, group, fromVoc } = useAppSelector(selectGames);

  const { data } = wordsAPI.useGetWordsQuery({ page, group });
  const [arr, setArr] = useState<QuestionsType[]>([]);
  const [answers, setAnswers] = useState<{ right: Word[]; errors: Word[] }>({ right: [], errors: [] });
  const [seconds, setSeconds] = useState<number>(SPRINT_SECONDS);
  const [points, setPoints] = useState<number>(0);
  const [showPoint, setShowPoint] = useState<boolean>(false);
  const [series, setSeries] = useState<number>(0);
  const [curId, setCurId] = useState<number>(0);
  const [stage, setStage] = useState<string>('game');

  useEffect(() => {
    if (data) {
      const array = getArraySprint(data);
      setArr([...arr, ...array]);
    }
  }, [data, arr]);

  useEffect(() => {
    const myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else {
        clearInterval(myInterval);
        setStage('result');
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  }, [seconds]);

  useEffect(() => {
    if (stage === 'game') {
      setArr([]);
      dispatch(setPage(Math.floor(Math.random() * 30)));
      setSeconds(SPRINT_SECONDS);
      setPoints(0);
      setSeries(0);
      setCurId(0);
      setAnswers({ right: [], errors: [] });
      setArr(arr.sort(() => Math.random() - 0.5));
    }
  }, [stage, arr, dispatch]);

  const playAgain = useCallback(() => {
    setStage('game');
  }, []);

  const checkAnswer = (event: React.MouseEvent<HTMLButtonElement>) => {
    const btn = event.target as HTMLButtonElement;
    const btnName = btn.name;
    if (btnName === arr[curId].answer) {
      setShowPoint(true);
      const audioFiles = new Audio('/assets/audio/right.mp3');
      audioFiles.play();
      if (series != 3) setSeries(series + 1);
      setPoints(points + POINTS * (series != SERIES_LENGTH ? series + 1 : series));
      setAnswers({ errors: [...answers.errors], right: [...answers.right, arr[curId].word] });
    } else {
      const audioFiles = new Audio('/assets/audio/error.mp3');
      audioFiles.play();
      setSeries(0);
      setAnswers({ errors: [...answers.errors, arr[curId].word], right: [...answers.right] });
    }
    if (curId === arr.length - 1) return setStage('result');
    if (curId > arr.length - 5) {
      if (fromVoc === true && page != 0) dispatch(setPage(page - 1));
      if (fromVoc === false) dispatch(setPage(page === 0 ? 30 : page - 1));
    }
    setCurId(curId + 1);
  };

  return (
    <Container component='main' className='games__container'>
      {!(arr.length > 0) ? (
        <Stack sx={{ color: 'grey.500' }} spacing={2} direction='row'>
          <CircularProgress color='secondary' />
        </Stack>
      ) : (
        <>
          {stage === 'game' && (
            <Box className='sprint__container'>
              <Box className='sprint__time-point'>
                <Box className='poins__container'>
                  <p className='points'>{points}</p>
                  <Rating name='read-only' value={series} readOnly max={SERIES_LENGTH} />
                  <Grow
                    in={showPoint}
                    timeout={500}
                    onTransitionEnd={() => setShowPoint(false)}
                    className='points__current'
                  >
                    <p>+{POINTS * series}</p>
                  </Grow>
                </Box>
                <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                  <CircularProgress
                    variant='determinate'
                    value={(seconds / 30) * 100}
                    color='secondary'
                    className='sprint__time'
                    size={150}
                  />
                  <Box className='sprint__time-text-container'>
                    <p className='sprint__time-text'>{seconds}</p>
                  </Box>
                </Box>
              </Box>
              <Box className='sprint__words'>
                <p className='sprint__word-en'>{arr[curId].word.word}</p>
                <p className='sprint__word-ru'>{arr[curId].translate}</p>
              </Box>
              <Box className='sprint__buttons'>
                <Button variant='contained' className='sprint__btn' color='error' name='false' onClick={checkAnswer}>
                  False
                </Button>
                <Button variant='contained' className='sprint__btn' color='success' name='true' onClick={checkAnswer}>
                  True
                </Button>
              </Box>
            </Box>
          )}
          {stage === 'result' && <Result playAgain={playAgain} answers={answers} />}
          <Background word='SPRINTSPRINT' />
        </>
      )}
    </Container>
  );
}
