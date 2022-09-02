import { useCallback, useEffect, useState } from 'react';
import { Button, Typography, Box, IconButton, Stack, CircularProgress, Rating, Grow } from '@mui/material';
import { Container } from '@mui/system';
import { VolumeUp } from '@mui/icons-material';
import VolumeUpOutlinedIcon from '@mui/icons-material/VolumeUpOutlined';
import { wordsAPI } from 'api/wordsService';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { setPage, selectGames } from 'redux/slices/gamesSlice';
import { Word } from 'types/types';
import { API_BASE_URL } from 'api/api';
import { Result, ResultsType } from 'pages/games/components/result/result';
import { Background } from 'pages/games/components/background';

import { POINTS, SERIES_LENGTH } from '../constants';
import { audioStartHandler, getArrayAudiocall } from '../utils';
import { selectAuth } from 'redux/slices/authUserSlice';
import AnswerBtnAudioCall from './answer-btn-audio-call';
import LogInAnswerBtnAudioCall from './login-answer-btn-audio-call';
import 'pages/games/audiocall/audiocall.css';

type QuestionsType = {
  word: Word;
  answers: { id: string; translate: string }[];
};

export default function AudioCall() {
  const dispatch = useAppDispatch();
  const { page, group, fromVoc } = useAppSelector(selectGames);
  const { data } = wordsAPI.useGetWordsQuery({ page, group });

  const { isAuth: isUserLoggedIn } = useAppSelector(selectAuth);

  const [arr, setArr] = useState<QuestionsType[]>([]);
  const [answers, setAnswers] = useState<ResultsType>({ right: [], errors: [], new: [] });

  const [points, setPoints] = useState<number>(0);
  const [showPoint, setShowPoint] = useState<boolean>(false);
  const [isAnswer, setIsAnswer] = useState<null | string>(null);
  const [series, setSeries] = useState<number>(0);
  const [longestSeries, setLongestSeries] = useState<number>(0);
  const [curId, setCurId] = useState<number>(0);
  const [stage, setStage] = useState<string>('game');

  useEffect(() => {
    if (data) {
      const array = getArrayAudiocall(data);
      setArr((prev) => [...prev, ...array]);
    }
  }, [data]);

  useEffect(() => {
    if (arr.length > 0) audioStartHandler(arr[curId].word.audio);
  }, [curId, arr]);

  const playAgain = useCallback(() => {
    if (fromVoc) {
      arr.sort(() => Math.random() - 0.5);
    } else {
      setArr([]);
      dispatch(setPage(Math.floor(Math.random() * 30)));
    }
    setPoints(0);
    setSeries(0);
    setCurId(0);
    setAnswers({ right: [], errors: [], new: [] });
    setStage('game');
  }, [arr, dispatch, fromVoc]);

  const rightAnswer = (isNew = true) => {
    setShowPoint(true);
    const audioFiles = new Audio('/assets/audio/right.mp3');
    audioFiles.play();
    setSeries(series + 1);
    setPoints(points + POINTS + POINTS * Math.trunc(series / SERIES_LENGTH));
    const newArray = isNew ? [...answers.new, arr[curId].word] : [...answers.new];
    setAnswers({ errors: [...answers.errors], new: [...newArray], right: [...answers.right, arr[curId].word] });
  };

  const errorAnswer = (isNew = true) => {
    const audioFiles = new Audio('/assets/audio/error.mp3');
    audioFiles.play();
    if (series > longestSeries) setLongestSeries(series);
    setSeries(0);
    const newArray = isNew ? [...answers.new, arr[curId].word] : [...answers.new];
    setAnswers({ errors: [...answers.errors, arr[curId].word], new: [...newArray], right: [...answers.right] });
  };

  const onNextClick = () => {
    setIsAnswer(null);
    if (curId === arr.length - 1) return setStage('result');
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
            <>
              <Box className='sprint__time-point'>
                <Box sx={{ width: '150px', height: '150px' }}></Box>
                <Box className='poins__audiocall'>
                  <p className='points'>{points}</p>
                  <Rating
                    name='read-only'
                    value={series % SERIES_LENGTH || (Math.trunc(series / SERIES_LENGTH) === 0 ? 0 : SERIES_LENGTH)}
                    readOnly
                    max={SERIES_LENGTH}
                  />
                  <Grow
                    in={showPoint}
                    timeout={500}
                    className='points__current'
                    onTransitionEnd={() => setShowPoint(false)}
                  >
                    <p>+{POINTS + POINTS * Math.trunc(series / SERIES_LENGTH)}</p>
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
                  if (isUserLoggedIn)
                    return (
                      <LogInAnswerBtnAudioCall
                        key={answer.id}
                        answer={answer}
                        currentWord={arr[curId].word}
                        isAnswer={isAnswer}
                        setIsAnswer={setIsAnswer}
                        rightAnswer={rightAnswer}
                        errorAnswer={errorAnswer}
                      />
                    );
                  else
                    return (
                      <AnswerBtnAudioCall
                        key={answer.id}
                        answer={answer}
                        currentWord={arr[curId].word}
                        isAnswer={isAnswer}
                        setIsAnswer={setIsAnswer}
                        rightAnswer={rightAnswer}
                        errorAnswer={errorAnswer}
                      />
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
          {stage === 'result' && (
            <Result playAgain={playAgain} answers={answers} game='audioCall' series={longestSeries} />
          )}
          <Background word='AUDIOCHALLENGE' />
        </>
      )}
    </Container>
  );
}
