import { Button, Typography, Box } from '@mui/material';
import { Container } from '@mui/system';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { wordsAPI } from '../../../api/wordsService';
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
import { Word } from '../../../types/types';
import { API_BASE_URL } from '../../../api/api';
import { Result } from '../components/result/result';
import { Start } from '../components/start/start';
import './sprint.css';

export default function Sprint() {const dispatch = useDispatch();
  const { page, group, stage, currentWord } = useAppSelector(selectGames);
  const { data } = wordsAPI.useGetWordsQuery({ page, group });

  const random = (num: number) => Math.floor(Math.random() * num);
  const [option, setOption] = useState<null | number>(null);
  const [points, setPoints] = useState<number>(0);
  const [seconds, setSeconds ] =  useState<number>(30);

  useEffect(()=>{
    dispatch(clearGame());
  },[]);

  useEffect(()=>{
    const myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else {
        clearInterval(myInterval);
        dispatch(setStage('result'));
      }
    }, 1000);
    return ()=> {
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
    console.log(num);
    if(num === 0) {
      setOption(answer);
    } else {
      const item = random(20);
      setOption(item);
    }
  };

  const checkAnsewr = (word: Word) => {    
    if (data) {
      if (data[currentWord].id === word.id) {
        dispatch(setTrueAnswers(word));
        setPoints(prev=>prev+10);
        console.log(true);
      } else {
        dispatch(setFalseAnswers(data[currentWord]));
        console.log(false);
      }
    }
    nextQuest(currentWord);
  };

  const nextQuest = (currentIndex: number) => {
    if (data && currentIndex >=data?.length-1) {
      dispatch(setStage('result'));
      return;
    }
    const index = currentIndex + 1; 
    addQuest(index);
    dispatch(setCurrentWord(index));
  };

  return (
    <main className="container_audiocall">
      <Container>
        {stage === 'start' && <Start onClickHandler={onClickHandler} title='Sprint' description='Sprint - training for speed. Try to guess as many words as you can in 30 seconds.' />}
        {stage === 'pending' && (
          <>
            {data && (
              <>
                <Box>
                  {data && <>
                    <Typography
                      variant='h1'
                      className='word-title'
                    >{seconds}
                    </Typography>
                    <Typography
                      variant='h1'
                      className='word-title'
                    >{points}
                    </Typography>
                    <Typography
                      variant='h3'
                      className='word-title'
                    >{data[currentWord].word}
                    </Typography>
                    <Typography
                      variant='h5'
                      className='word-title'
                    >{data[option ?? 0].wordTranslate}</Typography>
                    <Button
                      variant='contained'
                      color='error'
                      onClick={() => checkAnsewr(data[option ?? 0])}
                      sx={{ margin: '5px' }}
                    >
                    Неверно
                    </Button>
                    <Button
                      variant='contained'
                      color='success'
                      onClick={() => checkAnsewr(data[option ?? 0])}
                      sx={{ margin: '5px' }}
                    >
                    Верно
                    </Button>
                  </>}
                </Box>
              </>
            )}
          </>
        )}
        {stage === 'result' && <Result audioStartHandler={audioStartHandler} />}
      </Container>
    </main>
  );
}