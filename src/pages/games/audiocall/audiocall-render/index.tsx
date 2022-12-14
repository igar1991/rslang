import { useCallback, useEffect, useState } from 'react';
import { Box, Button, CircularProgress, Grow, IconButton, Rating, Stack, Typography } from '@mui/material';
import { Container } from '@mui/system';
import { VolumeUp } from '@mui/icons-material';
import VolumeUpOutlinedIcon from '@mui/icons-material/VolumeUpOutlined';
import { wordsAPI } from 'api/wordsService';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { selectGames, setPage } from 'redux/slices/gamesSlice';
import { AggregatedWord, Statistics, Word } from 'types/types';
import { API_BASE_URL } from 'api/api';
import { Result, ResultsType } from 'pages/games/components/result/result';
import { Background } from 'pages/games/components/background';

import { POINTS, SERIES_LENGTH } from '../../constants';
import { audioStartHandler, getArrayAudiocall, updateStat } from '../../utils';
import { selectAuth } from 'redux/slices/authUserSlice';
import AnswerBtnAudioCall from '../answer-btn-audio-call';
import LogInAnswerBtnAudioCall from '../login-answer-btn-audio-call';

import 'pages/games/audiocall/audiocall.css';

type QuestionsType = {
  word: Word;
  answers: { id: string; translate: string }[];
};

export default function AudioCallRender({ learnedWords, dataStatistic }: { learnedWords: AggregatedWord[]; dataStatistic: Statistics | null }) {
  const dispatch = useAppDispatch();
  const { page, group, fromVoc } = useAppSelector(selectGames);
  const { isAuth: isUserLoggedIn, id } = useAppSelector(selectAuth);

  const { data } = wordsAPI.useGetWordsQuery({ page, group });

  const [arr, setArr] = useState<QuestionsType[]>([]);
  const [answers, setAnswers] = useState<ResultsType>({ right: [], errors: [], new: [] });
  const [points, setPoints] = useState<number>(0);
  const [showPoint, setShowPoint] = useState<boolean>(false);
  const [isAnswer, setIsAnswer] = useState<null | string>(null);
  const [series, setSeries] = useState<number>(0);
  const [longestSeries, setLongestSeries] = useState<number>(0);
  const [curId, setCurId] = useState<number>(0);
  const [stage, setStage] = useState<string>('game');
  const [updateArr, setUpdateArr] = useState<boolean>(false);
  const [updateUserStatistics] = wordsAPI.useUpdateUserStatisticsMutation();

  useEffect(() => {
    if (data) {
      const array = getArrayAudiocall(data);
      if (fromVoc && isUserLoggedIn) {
        if (learnedWords) {
          const filterArr = learnedWords.map((item) => item._id);
          const curArr = array.filter((el) => !filterArr.includes(el.word.id));
          setArr((prev) => [...prev, ...curArr].slice(0, 20));
        }
      } else {
        setArr([...array]);
      }
      setUpdateArr(true);
    }
  }, [data, learnedWords, fromVoc, isUserLoggedIn]);

  useEffect(() => {
    if (arr.length > 0 && updateArr && curId === 0) {
      setUpdateArr(false);
      audioStartHandler(arr[curId].word.audio);
    }
  }, [arr, curId, updateArr]);

  const playAgain = useCallback(() => {
    arr.sort(() => Math.random() - 0.5);
    setUpdateArr(true);
    setPoints(0);
    setSeries(0);
    setCurId(0);
    setAnswers({ right: [], errors: [], new: [] });
    setStage('game');
  }, [arr]);

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
    if (arr.length < 20 && fromVoc && isUserLoggedIn) {
      if (page !== 0) dispatch(setPage(page - 1));
    }
    if (curId === arr.length - 1) {
      if(isUserLoggedIn) {
        updateStat('audioCall', longestSeries, answers , dataStatistic, id, updateUserStatistics, learnedWords.length);
      }
      return setStage('result');
    } else audioStartHandler(arr[curId + 1].word.audio);
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
                <Box sx={{ width: '150px', height: '10px' }}></Box>
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
