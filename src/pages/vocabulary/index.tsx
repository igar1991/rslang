import React from 'react';
import { Words } from './words';
import './vocabualry.css';
import { GamesLinks } from './games-links';

export default function Vocabulary() {
  return (
    <main className='container'>
      <Words />
      <GamesLinks />
    </main>
  );
}
