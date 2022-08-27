import { Button, Typography, Box, IconButton } from '@mui/material';
import { Container } from '@mui/system';
import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { authAPI } from '../../../api/authService';
import { wordsAPI } from '../../../api/wordsService';
import { useAppSelector } from '../../../redux/hooks';
import { VolumeUp } from '@mui/icons-material';
import {
  selectAudio,
  setGroup,
  setPage,
  setStage,
  setCurrentWord,
} from '../../../redux/slices/audioCallSlice';
import { selectAuth } from '../../../redux/slices/authUserSlice';
import { Word } from '../../../types/types';
import { WordsLevels } from '../../vocabulary/vocabulary-words/words-view/words-levels';
import { useGroupColor } from '../../hooks';
import './audiocall.css';
import { API_BASE_URL } from '../../../api/api';

export default function AudioCall() {
  const dispatch = useDispatch();
  const { page, group, stage, currentWord } = useAppSelector(selectAudio);
  const { data } = wordsAPI.useGetWordsQuery({ page, group });

  const random = (num: number) => Math.floor(Math.random() * num);
  const color = useGroupColor();
  const [option, setOption] = useState<number[]>([]);

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
    if (data) {
      if (data[currentWord].id === word.id) {
        console.log(true);
      } else {
        console.log(false);
      }
    }
  };

  const nextQuest = (currentIndex: number) => {
    addQuest(currentIndex + 1);
    dispatch(setCurrentWord(currentIndex + 1));
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
              <Typography sx={{marginBottom: '50px'}} variant="h6" gutterBottom>
              Тренеровка Аудиовызов улучшает твое восприятие речи на слух.
              </Typography>
            </>
            <WordsLevels onClickHandler={onClickHandler} />
          </>
        )}
        {stage === 'pending' && (
          <>
            {data &&
            <><Box>
              <IconButton
                color={color}
                aria-label='listen word pronunciation'
                onClick={()=>audioStartHandler(data[currentWord].audio)}
                size='large'
              >
                <VolumeUp sx={{width: '3em', height: '3em' }} />
              </IconButton>
            </Box>
            {option.map((item) => {
              return (
                <Button
                  key={data[item].id}
                  variant="outlined"
                  color="secondary"
                  onClick={() => checkAnsewr(data[item])}
                  sx={{margin: '5px'}}
                >
                  {data[item].word}
                </Button>
              );
            })}
            </>
            }
            <Box>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => nextQuest(currentWord)}
              >
                Следущий
              </Button>
            </Box>
          </>
        )}
      </Container>
    </main>
  );
}
