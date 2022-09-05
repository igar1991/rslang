import React from 'react';
import { VocabularyWords } from './vocabulary-words';
import './vocabualry.css';
import { GamesLinks } from './games-links';
import { Container } from '@mui/material';
import { VocabularyTabs } from './vocabulary-tabs';
import { useAppSelector } from 'redux/hooks';
import { selectAuth } from 'redux/slices/authUserSlice';

export default function Vocabulary() {
  const { isAuth: isUserLoggedIn } = useAppSelector(selectAuth);

  return (
    <Container component='main'>
      {isUserLoggedIn && <VocabularyTabs />}
      <VocabularyWords />
      <GamesLinks />
    </Container>
  );
}
