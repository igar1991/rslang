import { Box, Typography } from '@mui/material';
import './achievements.css';
import { AchievementCard } from 'pages/statistics/components/achievements/achievement-card';

export const Achievements = () => {
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
        <AchievementCard />
      </Box>
    </Box>
  );
};
