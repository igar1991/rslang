import { CircularProgress, Stack } from '@mui/material';
import { wordsAPI } from 'api/wordsService';
import { useAppSelector } from 'redux/hooks';
import { selectAuth } from 'redux/slices/authUserSlice';
import StatisticsRender from '.';

export default function AuthStatisticRender() {
  const { id } = useAppSelector(selectAuth);
  const { data, isSuccess } = wordsAPI.useGetUserWordsQuery(id);
  const { data: dataStatistic } = wordsAPI.useGetUserStatisticsQuery(id);

  return (
    <>
      {isSuccess ? (
        <StatisticsRender data={data} dataStatistic={dataStatistic}/>
      ) : (
        <Stack sx={{ color: 'grey.500' }} spacing={2} direction='row'>
          <CircularProgress color='secondary' />
        </Stack>
      )}
    </>
  );
}
