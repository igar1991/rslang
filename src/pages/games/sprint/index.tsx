import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Box } from '@mui/material';
import { Container } from '@mui/system';
import CircularProgress from '@mui/material/CircularProgress';
import { useAppSelector } from '../../../redux/hooks';
import {
  setGroup,
  setPage,
  setStage,
  setCurrentWord,
  setTrueAnswers,
  setFalseAnswers,
  clearGame,
  selectGames,
} from '../../../redux/slices/gamesSlice';
import { wordsAPI } from '../../../api/wordsService';
import { Word } from '../../../types/types';
import { API_BASE_URL } from '../../../api/api';
import { Result } from '../components/result/result';
import { Start } from '../components/start/start';
import { Background } from '../components/background';
import './sprint.css';


export default function Sprint() {
  const dispatch = useDispatch();
  const { page, group, stage, currentWord } = useAppSelector(selectGames);
  const { data } = wordsAPI.useGetWordsQuery({ page, group });

  const random = (num: number) => Math.floor(Math.random() * num);
  const [option, setOption] = useState<null | number>(null);
  const [points, setPoints] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(30);

  useEffect(() => {
    dispatch(clearGame());
  }, []);

  useEffect(() => {
    const myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else {
        clearInterval(myInterval);
        dispatch(setStage('result'));
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });

  const startCall = () => {
    addQuest(0);
    dispatch(setStage('pending'));
    setPoints(0);
  };

  const audioStartHandler = (audioFile: string) => {
    const audioFiles = new Audio(`${[API_BASE_URL, audioFile].join('/')}`);
    audioFiles.play();
  };

  const onClickHandler = useCallback((group: number) => {
    const randomPage = random(30);
    startCall();
    dispatch(setPage(randomPage));
    dispatch(setGroup(group));
  }, []);

  const addQuest = (answer: number) => {
    const num = random(2);
    if (num === 0) {
      setOption(answer);
    } else {
      const item = random(20);
      setOption(item);
    }
  };

  const checkAnsewr = (word: Word, answer: boolean) => {
    if (data) {
      if ((data[currentWord].id === word.id && answer) || data[currentWord].id !== word.id && !answer) {
        dispatch(setTrueAnswers(word));
        setPoints((prev) => prev + 10);
        const audioFiles = new Audio('/assets/audio/right.mp3');
        audioFiles.play();
      } else {
        dispatch(setFalseAnswers(data[currentWord]));
        const audioFiles = new Audio('/assets/audio/error.mp3');
        audioFiles.play();
      }
    }
    nextQuest(currentWord);
  };

  const nextQuest = (currentIndex: number) => {
    if (data && currentIndex >= data?.length - 1) {
      dispatch(setStage('result'));
      return;
    }
    const index = currentIndex + 1;
    addQuest(index);
    dispatch(setCurrentWord(index));
  };

  return (
    <Container component='main' className='games__container'>
      {stage === 'start' && (
        <Start
          onClickHandler={onClickHandler}
          title='Sprint'
          description='Sprint - training for speed. Try to guess as many words as you can in 30 seconds.'
        />
      )}
      {stage === 'pending' && (
        <>
          {data && (
            <Box className='sprint__container'>
              <Box className='sprint__time-point'>
                <p className='sprint__points'>{points}</p>
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
                <p className='sprint__word-en'>{data[currentWord].word}</p>
                <p className='sprint__word-ru'>{data[option ?? 0].wordTranslate}</p>
              </Box>
              <Box className='sprint__buttons'>
                <Button
                  variant='contained'
                  className='sprint__btn'
                  color='error'
                  size='large'
                  onClick={() => checkAnsewr(data[option ?? 0], false)}
                >
                  False
                </Button>
                <Button
                  variant='contained'
                  className='sprint__btn'
                  color='success'
                  size='large'
                  onClick={() => checkAnsewr(data[option ?? 0], true)}
                >
                  True
                </Button>
              </Box>
            </Box>
          )}
        </>
      )}
      {stage === 'result' && <Result audioStartHandler={audioStartHandler} />}
      <Background word='SPRINTSPRINT' />
    </Container>
  );
}

