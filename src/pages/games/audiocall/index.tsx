import { Button, Typography, Box } from '@mui/material';
import { Container } from '@mui/system';
import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { authAPI } from '../../../api/authService';
import { wordsAPI } from '../../../api/wordsService';
import { useAppSelector } from '../../../redux/hooks';
import { selectAudio, setGroup, setPage, setStage, setCurrentWord } from '../../../redux/slices/audioCallSlice';
import { selectAuth } from '../../../redux/slices/authUserSlice';
import { Word } from '../../../types/types';
import './audiocall.css';

export default function AudioCall() {
  const dispatch = useDispatch();
  const { page, group, stage, currentWord } = useAppSelector(selectAudio);
  const { data } = wordsAPI.useGetWordsQuery({ page, group });

  const random =(num: number)=> Math.floor(Math.random() * num);

  const [option, setOption] = useState<number[]>([]);

  const onClickHandler = useCallback((group: number) => {
    const randomPage = random(30);
    dispatch(setPage(randomPage));
    return dispatch(setGroup(group));
  }, []);

  const addQuest = (answer: number)=>{
    const arr = [answer];
    while(arr.length < 5){
      const item =  random(20);
      if(arr.indexOf(item) > -1) continue;
      arr.push(item);
      
    }
    setOption(arr.sort(() => Math.random() - 0.5));
  };

  const startCall =()=>{
    addQuest(0);
    dispatch(setStage('pending'));
  };

  const checkAnsewr=(word: Word)=>{
    if(data) {
      if(data[currentWord].id === word.id){
        console.log(true);
      } else {
        console.log(false);
      }
    }
  };

  const nextQuest =(currentIndex: number)=>{
    addQuest(currentIndex+1);
    dispatch(setCurrentWord(currentIndex+1));
  };

  return (
    <main className='container_audiocall'>
      <Container>
        {stage === 'start' && <>
          <h2 className='title'>Аудиовызов</h2>
          <h5>Тренеровка Аудиовызов улучшает твое восприятие речи на слух.</h5>
          <h5>Выбери уровень:</h5>
          <Button
            variant='contained'
            color='secondary'
            onClick={startCall}
          >
        Start Playing
          </Button>
          {/* <Button
            variant='contained'
            color='secondary'
            onClick={()=>console.log(option)}
          >
        Start Playing
          </Button> */}
        </>}
        {stage === 'pending' && <>
          {data && data[currentWord].wordTranslate}
          {data && option.map((item)=>{
            return (
              <Button
                key={data[item].id}
                variant='outlined'
                color='secondary'
                onClick={()=>checkAnsewr(data[item])}
              >
                {data[item].word}
              </Button>
            );
          })}
          <Box>
            <Button
              variant='contained'
              color='secondary'
              onClick={()=>nextQuest(currentWord)}
            >
        Следущий
            </Button>
          </Box>
        </>}


      </Container>
    </main>
  );
}