import { useCallback, useEffect, useState } from 'react';
import { Button, Typography, Box, IconButton, Stack, CircularProgress, Rating, Grow } from '@mui/material';
import { Container } from '@mui/system';
import { VolumeUp } from '@mui/icons-material';
import VolumeUpOutlinedIcon from '@mui/icons-material/VolumeUpOutlined';
import { wordsAPI } from '../../../api/wordsService';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { setPage, selectGames } from '../../../redux/slices/gamesSlice';
import { Word } from '../../../types/types';
import { API_BASE_URL } from '../../../api/api';
import { Result } from '../components/result/result';
import { Background } from '../components/background';

import './audiocall.css';

type QuestionsType = {
  word: Word;
  answers: { id: string; translate: string }[];
};

export default function AudioCall() {
  const dispatch = useAppDispatch();
  const { page, group, fromVoc } = useAppSelector(selectGames);

  const { data } = wordsAPI.useGetWordsQuery({ page, group });
  const [arr, setArr] = useState<QuestionsType[]>([]);
  const [answers, setAnswers] = useState<{ right: Word[]; errors: Word[] }>({ right: [], errors: [] });
  const [points, setPoints] = useState<number>(0);
  const [showPoint, setShowPoint] = useState<boolean>(false);
  const [isAnswer, setIsAnswer] = useState<null | string>(null);
  const [series, setSeries] = useState<number>(0);
  const [curId, setCurId] = useState<number>(0);
  const [stage, setStage] = useState<string>('game');

  useEffect(() => {
    if (data) {
      const array = data.map((item, index) => {
        const answersId = [index];
        do {
          const random = Math.floor(Math.random() * 20);
          if (!answersId.includes(random)) answersId.push(random);
        } while (answersId.length < 5);
        const answers = answersId.map((item) => {
          return { id: data[item].id, translate: data[item].wordTranslate };
        });

        answers.sort(() => Math.random() - 0.5);

        return { word: item, answers: answers };
      });
      array.sort(() => Math.random() - 0.5);
      if (arr.length + array.length < 20) {
        if (fromVoc === true && page != 0) dispatch(setPage(page - 1));
        if (fromVoc === false) dispatch(setPage(page === 0 ? 20 : page - 1));
      }
      setArr([...arr, ...array]);
      if (curId === 0) audioStartHandler(array[curId].word.audio);
    }
  }, [data]);

  useEffect(() => {
    if (arr.length > 0 && curId != 0) audioStartHandler(arr[curId].word.audio);
  }, [curId]);

  useEffect(() => {
    if (stage === 'game') {
      setArr([]);
      dispatch(setPage(Math.floor(Math.random() * 30)));
      setPoints(0);
      setSeries(0);
      setCurId(0);
      setAnswers({ right: [], errors: [] });
    }
  }, [stage]);

  const playAgain = useCallback(() => {
    setStage('game');
  }, []);

  const checkAnswer = (event: React.MouseEvent<HTMLButtonElement>) => {
    const btn = event.target as HTMLButtonElement;
    const btnName = btn.name;
    setIsAnswer(btnName);
    if (btnName === arr[curId].word.id) {
      setShowPoint(true);
      const audioFiles = new Audio('/assets/audio/right.mp3');
      audioFiles.play();
      if (series != 3) setSeries(series + 1);
      setPoints(points + 10 * (series != 3 ? series + 1 : series));
      setAnswers({ errors: [...answers.errors], right: [...answers.right, arr[curId].word] });
    } else {
      const audioFiles = new Audio('/assets/audio/error.mp3');
      audioFiles.play();
      setSeries(0);
      setAnswers({ errors: [...answers.errors, arr[curId].word], right: [...answers.right] });
    }
  };

  const onNextClick = () => {
    setIsAnswer(null);
    if (curId === 19) return setStage('result');
    setCurId(curId + 1);
  };

  const audioStartHandler = (audioFile: string) => {
    const audioFiles = new Audio(`${[API_BASE_URL, audioFile].join('/')}`);
    audioFiles.play();
  };

  const chooseClass = (id: string) => {
    if (isAnswer === null) return 'audiocall__answer-btn';
    if (id === arr[curId].word.id) return 'audiocall__answer-btn right-btn';
    if (isAnswer === id) return 'audiocall__answer-btn error-btn';
    return 'audiocall__answer-btn';
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
            <>
              <Box className='sprint__time-point'>
                <Box sx={{width: '150px', height: '150px'}}></Box>
                <Box className='poins__audiocall'>
                  <p className='points'>{points}</p>
                  <Rating name='read-only' value={series} readOnly max={3} />
                  <Grow
                    in={showPoint}
                    timeout={500}
                    className='points__current'
                    onTransitionEnd={() => setShowPoint(false)} 
                  >
                    <p>+{10 * series}</p>
                  </Grow>
                </Box>
              </Box>
              <Box className='audiocall__question'>
                {isAnswer === null ? (
                  <Box className='audiocall__icon-container'>
                    <IconButton
                      aria-label='listen word pronunciation'
                      onClick={() => audioStartHandler(arr[curId].word.audio)}
                      size='large'
                    >
                      <VolumeUpOutlinedIcon className='audiocall__icon' />
                    </IconButton>
                  </Box>
                ) : (
                  <>
                    <Box
                      component='img'
                      alt='Word image'
                      src={`${[API_BASE_URL, arr[curId].word.image].join('/')}`}
                      className='word__details-card_image'
                    />
                    <Typography variant='h5' className='word_title'>
                      <IconButton
                        color='secondary'
                        aria-label='listen word pronunciation'
                        onClick={() => audioStartHandler(arr[curId].word.audio)}
                        size='large'
                      >
                        <VolumeUp />
                      </IconButton>
                      {arr[curId].word.word}
                    </Typography>
                  </>
                )}
              </Box>
              <Box className='audiocall__answers'>
                {arr[curId].answers.map((answer) => {
                  return (
                    <Button
                      key={answer.id}
                      name={answer.id}
                      variant='outlined'
                      disabled={!!isAnswer}
                      color='secondary'
                      onClick={checkAnswer}
                      sx={{ margin: '5px' }}
                      className={chooseClass(answer.id)}
                    >
                      {answer.translate}
                    </Button>
                  );
                })}
              </Box>
              {isAnswer != null ? (
                <Button variant='contained' color='secondary' onClick={onNextClick} className='audiocall__next-btn'>
                  Next
                </Button>
              ) : (
                <Box sx={{ height: '55px' }}></Box>
              )}
            </>
          )}
          {stage === 'result' && <Result playAgain={playAgain} answers={answers} />}
          <Background word='AUDIOCHALLENGE' />
        </>
      )}
    </Container>
  );
}
