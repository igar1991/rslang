import React from 'react';
import { Box } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import { VolumeUp } from '@mui/icons-material';
import { Word } from '../../../../../types/types';

import './result-list.css';

type ResultListType = {
    name: string;
    arr: Word[];
    audioStartHandler: (audioFile: string) => void;
}

export default function ResultList({name, arr, audioStartHandler}: ResultListType) {
  return (
    <Box>
      <h3 className='result__list-title'>{`${name} (${arr.length})`}</h3>
      <List>
        {arr.map(word => 
          <ListItem key={word.id} className='result__list-item'>
            <ListItemIcon
              className='result__list-icon'
              onClick={() => audioStartHandler(word.audio)}>
              <VolumeUp color='secondary'/>
            </ListItemIcon>
            <ListItemText primary={`${word.word} - ${word.wordTranslate}`} />
          </ListItem>)}
      </List>
    </Box>
  );
}
