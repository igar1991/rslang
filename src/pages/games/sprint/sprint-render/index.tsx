import { useCallback, useEffect, useState } from 'react';
import { Box, Rating, Grow } from '@mui/material';
import { Container } from '@mui/system';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { setPage, selectGames } from 'redux/slices/gamesSlice';
import { wordsAPI } from 'api/wordsService';
import { AggregatedWord, Word } from 'types/types';
import { Result, ResultsType } from 'pages/games/components/result/result';
import { Background } from 'pages/games/components/background';

import 'pages/games/sprint/sprint.css';
import { POINTS, SERIES_LENGTH, SPRINT_SECONDS } from '../../constants';
import { getArraySprint } from '../../utils';
import { selectAuth } from 'redux/slices/authUserSlice';
import LogInAnswerBtnSprint from '../login-answer-btn-sprint';
import AnswerBtnSprint from '../answer-btn-sprint';

export type QuestionsType = {
  word: Word;
  answer: string;
  translate: string;
};

export default function SprintRender({ learnedWords }: { learnedWords: AggregatedWord[] }) {
  const dispatch = useAppDispatch();
  const { page, group, fromVoc } = useAppSelector(selectGames);
  const { isAuth: isUserLoggedIn } = useAppSelector(selectAuth);

  const { data } = wordsAPI.useGetWordsQuery({ page, group });

  const [arr, setArr] = useState<QuestionsType[]>([]);
  const [answers, setAnswers] = useState<ResultsType>({ right: [], errors: [], new: [] });
  const [seconds, setSeconds] = useState<number>(SPRINT_SECONDS);
  const [points, setPoints] = useState<number>(0);
  const [showPoint, setShowPoint] = useState<boolean>(false);
  const [series, setSeries] = useState<number>(0);
  const [longestSeries, setLongestSeries] = useState<number>(0);
  const [curId, setCurId] = useState<number>(0);
  const [stage, setStage] = useState<string>('game');

  useEffect(() => {
    if (data) {
      const array = getArraySprint(data);
      if (fromVoc && isUserLoggedIn) {
        if (learnedWords) {
          const filterArr = learnedWords.map((item) => item._id);
          const curArr = array.filter((el) => !filterArr.includes(el.word.id));
          setArr((prev) => [...prev, ...curArr]);
        }
      } else {
        setArr((prev) => [...prev, ...array]);
      }
    }
  }, [data, learnedWords, fromVoc, isUserLoggedIn]);

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

  const playAgain = useCallback(() => {
    if (fromVoc) {
      arr.sort(() => Math.random() - 0.5);
    } else {
      setArr([]);
      dispatch(setPage(Math.floor(Math.random() * 30)));
    }
    setStage('game');
    setSeconds(SPRINT_SECONDS);
    setPoints(0);
    setSeries(0);
    setCurId(0);
    setAnswers({ right: [], errors: [], new: [] });
  }, [arr, dispatch, fromVoc]);

  const nextQestion = useCallback(() => {
    if (curId === arr.length - 1) return setStage('result');
    if (curId > arr.length - 5) {
      if (fromVoc && page != 0) dispatch(setPage(page - 1));
      if (!fromVoc) dispatch(setPage(page === 0 ? 30 : page - 1));
    }
    setCurId(curId + 1);
  }, [arr, curId, dispatch, fromVoc, page]);

  const rightAnswer = useCallback(
    (isNew = true) => {
      setShowPoint(true);
      const audioFiles = new Audio('/assets/audio/right.mp3');
      audioFiles.play();
      setSeries(series + 1);
      setPoints(points + POINTS + POINTS * Math.trunc(series / SERIES_LENGTH));
      const newArray = isNew ? [...answers.new, arr[curId].word] : [...answers.new];
      setAnswers({ errors: [...answers.errors], new: [...newArray], right: [...answers.right, arr[curId].word] });
      nextQestion();
    },
    [answers.errors, answers.new, answers.right, arr, curId, nextQestion, points, series]
  );

  const errorAnswer = useCallback(
    (isNew = true) => {
      const audioFiles = new Audio('/assets/audio/error.mp3');
      audioFiles.play();
      if (series > longestSeries) setLongestSeries(series);
      setSeries(0);
      const newArray = isNew ? [...answers.new, arr[curId].word] : [...answers.new];
      setAnswers({ errors: [...answers.errors, arr[curId].word], new: [...newArray], right: [...answers.right] });
      nextQestion();
    },
    [answers.errors, answers.new, answers.right, arr, curId, longestSeries, nextQestion, series]
  );

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
              {isUserLoggedIn ? (
                <LogInAnswerBtnSprint question={arr[curId]} rightAnswer={rightAnswer} errorAnswer={errorAnswer} />
              ) : (
                <AnswerBtnSprint question={arr[curId]} rightAnswer={rightAnswer} errorAnswer={errorAnswer} />
              )}
            </Box>
          )}
          {stage === 'result' && (
            <Result playAgain={playAgain} answers={answers} game='sprint' series={longestSeries} />
          )}
          <Background word='SPRINTSPRINT' />
        </>
      )}
    </Container>
  );
}
