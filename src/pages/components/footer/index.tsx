import React from 'react';
import Box from '@mui/material/Box';
import { Container, Link } from '@mui/material';

import GitHubIcon from '@mui/icons-material/GitHub';

import './footer.css';

export default function Footer(): JSX.Element {
  return (
    <Container component='footer'>
      <Box className='footer'>
        <Link href='https://rs.school/js/'>
          <img src='assets/rs.svg' alt='Rs school' className='footer__rs' />
        </Link>
        <Box className='footer__git-links'>
          <p className='footer__git-text'>&#169;,&nbsp;2022</p>
          <GitHubIcon className='footer__git-text' />
          <Link href='https://github.com/nensty' className='footer__git-link'>
            Nensty
          </Link>
          <Link href='https://github.com/igar1991' className='footer__git-link'>
            Igar1991
          </Link>
          <Link href='https://github.com/philonena' className='footer__git-link'>
            Philonena
          </Link>
        </Box>
      </Box>
    </Container>
  );
}
