import React from 'react';

import 'pages/games/components/background/background.css';

export function Background({ word }: { word: string }) {
  return (
    <ul className='letters'>
      {word.split('').map((letter, index) => (
        <li key={index}>{letter}</li>
      ))}
    </ul>
  );
}
