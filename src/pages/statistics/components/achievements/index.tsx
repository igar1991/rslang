import { Box, Typography } from '@mui/material';
import './achievements.css';
import { AchievementCard } from 'pages/statistics/components/achievements/achievement-card';
import { wordsAPI } from 'api/wordsService';
import { useAppSelector } from 'redux/hooks';
import { selectAuth } from 'redux/slices/authUserSlice';
import { useEffect, useState } from 'react';
import { Achievement } from 'types/types';

export const Achievements = () => {
  const { id } = useAppSelector(selectAuth);
  const { data } = wordsAPI.useGetUserStatisticsQuery(id);
  const [achievements, setAchievements] = useState<Achievement[]>([]);

  useEffect(() => {
    if (data) {
      const achievementsArr = Object.entries(data.optional.achievements).map((entry) => entry[1]);
      setAchievements(achievementsArr);
    }
  }, [data]);

  return (
    <Box className='achievements'>
      <Typography
        sx={{ marginTop: '40px' }}
        variant='h4'
        className='long-term-statistics'
      >
        My achievements
      </Typography>
      <Box className='achievements-wrapper'>
        {achievements.map(({ id, name, description, img, achieved }, index) => (
          <AchievementCard
            name={name}
            description={description}
            image={img}
            key={id || index}
            achieved={achieved}
          />)
        )}
      </Box>
    </Box>
  );
};
