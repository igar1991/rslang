import React from 'react';
import { VocabularyWords } from './vocabulary-words';
import './vocabualry.css';
import { GamesLinks } from './games-links';
import { Container } from '@mui/material';
import { VocabularyTabs } from './vocabulary-tabs';
import { useAppSelector } from '../../redux/hooks';

export default function Vocabulary() {
  const isUserLoggedIn = useAppSelector((state) => state.auth.isAuth);

  return (
    <Container component='main'>
      {isUserLoggedIn && <VocabularyTabs />}
      <VocabularyWords />
      <GamesLinks />
    </Container>
  );
}
