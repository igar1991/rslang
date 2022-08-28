import { Button, Typography, Box, IconButton } from '@mui/material';
import { Container } from '@mui/system';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { wordsAPI } from '../../../api/wordsService';
import { useAppSelector } from '../../../redux/hooks';
import { VolumeUp } from '@mui/icons-material';
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
import { WordsLevels } from '../../vocabulary/vocabulary-words/words-view/words-levels';
import { useGroupColor } from '../../hooks';
import './audiocall.css';
import { API_BASE_URL } from '../../../api/api';
import { Result } from '../components/result/result';

export default function AudioCall() {
  const dispatch = useDispatch();
  const { page, group, stage, currentWord } = useAppSelector(selectGames);
  const { data } = wordsAPI.useGetWordsQuery({ page, group });

  const random = (num: number) => Math.floor(Math.random() * num);
  const color = useGroupColor();
  const [option, setOption] = useState<number[]>([]);
  const [isAnswer, setIsAnswer] = useState<null | string>(null);

  useEffect(()=>{
    dispatch(clearGame());
  },[]);

  const startCall = () => {
    addQuest(0);
    dispatch(setStage('pending'));
  };

  const onClickHandler = useCallback((group: number) => {
    const randomPage = random(30);
    startCall();
    dispatch(setPage(randomPage));
    dispatch(setGroup(group));
  }, []);

  const audioStartHandler = (audioFile: string) => {
    const audioFiles = new Audio(`${[API_BASE_URL, audioFile].join('/')}`);
    audioFiles.play();
  };

  const addQuest = (answer: number) => {
    const arr = [answer];
    while (arr.length < 5) {
      const item = random(20);
      if (arr.indexOf(item) > -1) continue;
      arr.push(item);
    }
    setOption(arr.sort(() => Math.random() - 0.5));
  };

  const checkAnsewr = (word: Word) => {
    if (isAnswer !== null) return;
    
    if (data) {
      if (data[currentWord].id === word.id) {
        dispatch(setTrueAnswers(word));
      } else {
        dispatch(setFalseAnswers(data[currentWord]));
      }
      setIsAnswer(word.id);
    }
  };

  const nextQuest = (currentIndex: number) => {
    if (data && currentIndex >=data?.length-1) {
      dispatch(setStage('result'));
      return;
    }
    
    if(data && isAnswer === null) {
      setIsAnswer(data[currentIndex].id);
      dispatch(setFalseAnswers(data[currentWord]));
    } else {
      const index = currentIndex + 1; 
      addQuest(index);
      dispatch(setCurrentWord(index));
      setIsAnswer(null);
    }
  };

  const chooseColor = (id: string) => {
    if (isAnswer === null) return 'secondary';
    if (data && id === data[currentWord].id) return 'success';
    if (isAnswer === id) return 'error';
    return 'secondary';
  };

  return (
    <main className="container_audiocall">
      <Container>
        {stage === 'start' && (
          <>
            <>
              <Typography variant="h3" gutterBottom>
                Аудиовызов
              </Typography>
              <Typography
                sx={{ marginBottom: '50px' }}
                variant="h6"
                gutterBottom
              >
                Тренеровка Аудиовызов улучшает твое восприятие речи на слух.
              </Typography>
            </>
            <WordsLevels onClickHandler={onClickHandler} />
          </>
        )}
        {stage === 'pending' && (
          <>
            {data && (
              <>
                <Box>
                  {isAnswer === null ? (
                    <IconButton
                      color={color}
                      aria-label="listen word pronunciation"
                      onClick={() => audioStartHandler(data[currentWord].audio)}
                      size="large"
                    >
                      <VolumeUp sx={{ width: '3em', height: '3em' }} />
                    </IconButton>
                  ) : (
                    <>
                      <Box
                        component="img"
                        alt="Word image"
                        src={`${[API_BASE_URL, data[currentWord].image].join(
                          '/'
                        )}`}
                        className="word__details-card_image"
                      />
                      <Typography
                        variant='h5'
                        className='word-title'
                      >
                        <IconButton
                          color={color}
                          aria-label="listen word pronunciation"
                          onClick={() => audioStartHandler(data[currentWord].audio)}
                          size="large"
                        >
                          <VolumeUp />
                        </IconButton>
                        {data[currentWord].word}
                      </Typography>
                    </>
                  )}
                </Box>
                {option.map((item) => {
                  return (
                    <Button
                      key={data[item].id}
                      variant={
                        isAnswer === data[item].id ||
                        (isAnswer && data[currentWord].id === data[item].id)
                          ? 'contained'
                          : 'outlined'
                      }
                      color={chooseColor(data[item].id)}
                      onClick={() => checkAnsewr(data[item])}
                      sx={{ margin: '5px' }}
                    >
                      {data[item].wordTranslate}
                    </Button>
                  );
                })}
              </>
            )}
            <Box>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => nextQuest(currentWord)}
              >
                {isAnswer === null ? 'Не знаю' : 'Дальше'}
              </Button>
            </Box>
          </>
        )}
        {stage === 'result' && <Result audioStartHandler={audioStartHandler} />}
      </Container>
    </main>
  );
}
