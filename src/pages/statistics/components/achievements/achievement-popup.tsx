import React, { useCallback, useEffect, useState } from 'react';
import { Backdrop, Box, Button, Typography } from '@mui/material';
import { useDevice } from 'pages/hooks';
import { useNavigate } from 'react-router-dom';
import { wordsAPI } from 'api/wordsService';
import { useAppSelector } from 'redux/hooks';
import { selectAuth } from 'redux/slices/authUserSlice';
import { getRequestBody } from './utils';
import './achievements.css';

const headingByDeviceMap: Map<string, 'h4' | 'h5' | 'h6'> = new Map([
  ['desktop', 'h4'],
  ['tablet', 'h5'],
  ['mobile', 'h6'],
]);

export const AchievementPopup = () => {
  const device = useDevice();
  const navigate = useNavigate();

  const { id: userId } = useAppSelector(selectAuth);

  const { data: userStatistics } = wordsAPI.useGetUserStatisticsQuery(userId);
  const [updateStatistics] = wordsAPI.useUpdateUserStatisticsMutation();

  const [show, setShow] = useState(false);
  const [image, setImage] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (userStatistics) {
      const learnedWords = userStatistics.learnedWords;
      const achievements = userStatistics.optional.achievements;
      const newWords = userStatistics.optional.newWords;

      if (achievements.achievement1?.achieved && !achievements.achievement1.shown) {
        setShow(true);
        setImage(achievements.achievement1.img);
        setTitle(achievements.achievement1.name);
        setDescription(achievements.achievement1.description);

        updateStatistics({
          id: userId,
          body: getRequestBody('achievement1', achievements.achievement1, 'shown', learnedWords, userStatistics),
        });
      }

      if (learnedWords >= 10) {
        if (!achievements.achievement2?.achieved) {
          updateStatistics({
            id: userId,
            body: getRequestBody('achievement2', achievements.achievement2, 'achieved', learnedWords, userStatistics),
          });
        }
        if (achievements.achievement2?.achieved && !achievements.achievement2?.shown) {
          setShow(true);
          setImage(achievements.achievement2.img);
          setTitle(achievements.achievement2.name);
          setDescription(achievements.achievement2.description);

          updateStatistics({
            id: userId,
            body: getRequestBody('achievement2', achievements.achievement2, 'shown', learnedWords, userStatistics),
          });
        }
      }
      if (learnedWords >= 50) {
        if (!achievements.achievement3?.achieved) {
          updateStatistics({
            id: userId,
            body: getRequestBody('achievement3', achievements.achievement3, 'achieved', learnedWords, userStatistics),
          });
        }
        if (achievements.achievement3?.achieved && !achievements.achievement3?.shown) {
          setShow(true);
          setImage(achievements.achievement3.img);
          setTitle(achievements.achievement3.name);
          setDescription(achievements.achievement3.description);

          updateStatistics({
            id: userId,
            body: getRequestBody('achievement3', achievements.achievement3, 'shown', learnedWords, userStatistics),
          });
        }
      }
      if (newWords >= 100) {
        if (!achievements.achievement4?.achieved) {
          updateStatistics({
            id: userId,
            body: getRequestBody('achievement4', achievements.achievement4, 'achieved', learnedWords, userStatistics),
          });
        }
        if (achievements.achievement4?.achieved && !achievements.achievement4?.shown) {
          setShow(true);
          setImage(achievements.achievement4.img);
          setTitle(achievements.achievement4.name);
          setDescription(achievements.achievement4.description);

          updateStatistics({
            id: userId,
            body: getRequestBody('achievement4', achievements.achievement4, 'shown', learnedWords, userStatistics),
          });
        }
      }
      if (newWords >= 500) {
        if (!achievements.achievement5?.achieved) {
          updateStatistics({
            id: userId,
            body: getRequestBody('achievement5', achievements.achievement5, 'achieved', learnedWords, userStatistics),
          });
        }
        if (achievements.achievement5?.achieved && !achievements.achievement5?.shown) {
          setShow(true);
          setImage(achievements.achievement5.img);
          setTitle(achievements.achievement5.name);
          setDescription(achievements.achievement5.description);

          updateStatistics({
            id: userId,
            body: getRequestBody('achievement5', achievements.achievement5, 'shown', learnedWords, userStatistics),
          });
        }
      }
      if (achievements.achievement6?.achieved && !achievements.achievement6?.shown) {
        setShow(true);
        setImage(achievements.achievement6.img);
        setTitle(achievements.achievement6.name);
        setDescription(achievements.achievement6.description);

        updateStatistics({
          id: userId,
          body: getRequestBody('achievement6', achievements.achievement6, 'shown', learnedWords, userStatistics),
        });
      }
    }
  }, [updateStatistics, userId, userStatistics]);

  const handleClick = useCallback(() => {
    navigate('/statistics');
  }, [navigate]);

  const handleCloseDialog = () => {
    setShow(false);
    if (
      userStatistics &&
      userStatistics.optional.achievements.achievement1?.shown &&
      userStatistics.optional.achievements.achievement2?.shown &&
      userStatistics.optional.achievements.achievement3?.shown &&
      userStatistics.optional.achievements.achievement4?.shown &&
      userStatistics.optional.achievements.achievement5?.shown
    )
      showLastAchievement();
  };

  const showLastAchievement = () => {
    if (userStatistics) {
      const learnedWords = userStatistics.learnedWords;
      const achievements = userStatistics.optional.achievements;

      if (!achievements.achievement6?.achieved) {
        updateStatistics({
          id: userId,
          body: getRequestBody('achievement6', achievements.achievement6, 'achieved', learnedWords, userStatistics),
        });
      }
      
    }
  };

  return (
    <Backdrop
      sx={{
        color: '#fff',
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: 'rgba(9,8,12,0.9)',
        backdropFilter: 'blur(5px)',
      }}
      open={show}
      onClick={handleCloseDialog}
      className='achievement-popup'
    >
      <Typography variant={headingByDeviceMap.get(device)} className='achievement-popup-title'>
        You've unlocked a new achievement!
      </Typography>
      <Box className='achievement-details'>
        <Box
          component='img'
          src={image}
          sx={{
            height: {
              xs: 100,
              md: 200,
            },
          }}
        />
        <Typography variant='h6' className='game-title achievement-popup-title'>
          {title}
        </Typography>
        <Typography variant='body1' className='game-description achievement-popup-title'>
          {description}
        </Typography>
      </Box>
      <Button className='achievement-button' variant='contained' onClick={handleClick}>
        See my achievements
      </Button>
    </Backdrop>
  );
};
