import React from 'react';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Box, Link } from '@mui/material';

import GitHubIcon from '@mui/icons-material/GitHub';

import './about.css';

const DEVELOPERS = [
  {
    name: 'Anastasiya Sazonava',
    github: 'nensty',
    description:
      'Start your learning from the most common words that can provide you with the vocabulary you need to hold basic conversations.',
  },
  {
    name: 'Ihar Charnyshou',
    github: 'igar1991',
    description:
      'Start your learning from the most common words that can provide you with the vocabulary you need to hold basic conversations.',
  },
  {
    name: 'Natalia Chinarova',
    github: 'philonena',
    description:
      'Start your learning from the most common words that can provide you with the vocabulary you need to hold basic conversations.',
  },
];

export default function About(): JSX.Element {
  return (
    <Box component='section' className='section'>
      <h2 className='section-title'>What about team?</h2>

      <Box sx={{ display: { xs: 'block', sm: 'flex' } }} className='developers'>
        {DEVELOPERS.map((dev) => (
          <div key={dev.name} className='developer'>
            <CardMedia
              component='img'
              className='developer__img'
              sx={{ width: '80%' }}
              image={`assets/${dev.github}.jpg`}
              alt={dev.name}
            />
            <CardContent>
              <h3 className='developer__name'>{dev.name}</h3>
              <Link className='developer__link' href={`https://github.com/${dev.github}`}>
                <GitHubIcon /> {dev.github}
              </Link>
              <p className='developer__desc'>{dev.description}</p>
            </CardContent>
          </div>
        ))}
      </Box>
    </Box>
  );
}
