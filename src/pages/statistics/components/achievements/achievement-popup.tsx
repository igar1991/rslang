import { Backdrop, Box, Button, Typography } from '@mui/material';
import React, { useCallback } from 'react';
import { useDevice } from 'pages/hooks';
import './achievements.css';
import { useNavigate } from 'react-router-dom';

interface PopupProps {
  show: boolean;
  handleCloseDialog: () => void;
  title: string;
  image: string;
  description: string;
}

const headingByDeviceMap: Map<string, 'h4' | 'h5' | 'h6'> = new Map([
  ['desktop', 'h4'],
  ['tablet', 'h5'],
  ['mobile', 'h6'],
]);

export const AchievementPopup = ({ show, handleCloseDialog, title, description, image }: PopupProps) => {
  const device = useDevice();
  const navigate = useNavigate();

  const handleClick = useCallback(() => {
    navigate('/statistics');
  }, [navigate]);

  return (
    <Backdrop
      sx={{
        color: '#fff',
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: 'rgba(9,8,12,0.9)',
        backdropFilter: 'blur(5px)'
      }}
      open={show}
      onClick={handleCloseDialog}
      className='achievement-popup'
    >
      <Typography
        variant={headingByDeviceMap.get(device)}
        className='achievement-popup-title'
      >
        You've unlocked a new achievement!
      </Typography>
      <Box className='achievement-details'>
        <Box
          component='img'
          src={image}
          sx={{
            height: {
              xs: 100,
              md: 200
            }
          }}
        />
        <Typography variant='h6' className='game-title achievement-popup-title'>{title}</Typography>
        <Typography variant='body1' className='game-description achievement-popup-title'>{description}</Typography>
      </Box>
      <Button className='achievement-button' variant='contained' onClick={handleClick}>
        See my achievements
      </Button>
    </Backdrop>
  );
};
