import { Box, Container, Typography } from '@mui/material';
import { Card } from './components/card';
import './statistics.css';
import { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { wordsAPI } from 'api/wordsService';
import { useAppSelector } from 'redux/hooks';
import { selectAuth } from 'redux/slices/authUserSlice';
import { UserWordData } from 'types/types';

export default function Statistics() {

  const [categories, setСategories] = useState<string[]>([]);
  const [seriesNew, setSeriesNew] = useState<number[]>([]);
  const [seriesLearned, setSeriesNewLearned] = useState<number[]>([]);
  const {id} = useAppSelector(selectAuth);

  const { data } = wordsAPI.useGetUserWordsQuery(id);
  
  useEffect(() => {
    if(data)createFilter(data);
    
  }, [data]);

  const createFilter =(data: UserWordData[])=>{
    const dataFilter = data?.filter((item)=> Object.keys(item.optional).includes('date') && item.optional.learned);
    const res = dataFilter?.reduce((previousValue:{[key: string]: number}, currentValue)=>{
      if(Object.keys(previousValue).includes(currentValue.optional.date as string)) {
        if(currentValue.optional.date) {
          previousValue[currentValue.optional.date]+=1;
        }
      } else {
        if(currentValue.optional.date) {
          previousValue[currentValue.optional.date] = 1;
        }
      }
      return previousValue;
    }, {});
    setSeriesNewLearned(Object.values(res));
    setСategories(Object.keys(res));
  };

  return (
    <Container className='container'>
      <h2 className='title'>Statistics for today</h2>
      <div className='container_result'>
        <Box >
          <h2 className='title_num'>0</h2>
          <h4>Words learned</h4>
        </Box>
        <Box>
          <h2 className='title_num'>0%</h2>
          <h4>Сorrect answers</h4>
        </Box>
      </div>
      <div className='container_result'>
        <Box className='game__card'>
          <Card img='/assets/game-sprint.png' title='Sprint' word={2} trueans={12} long={5} />
        </Box>
        <Box className='game__card'>
          <Card img='/assets/game-listen.png' title='Audio Challenge' word={2} trueans={12} long={5}/>
        </Box>
      </div>
      <Typography sx={{marginTop: '60px'}} variant='h4'>Statistics for all time</Typography>
      <Typography sx={{marginTop: '20px'}} variant='h6'>Statistics are available only to authorized users</Typography>
      <ReactApexChart options={{
        chart: {
          height: 450,
          type: 'area',
          toolbar: {
            show: false
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'smooth',
          width: 2
        },
        grid: {
          strokeDashArray: 0
        },
        xaxis: {
          categories: categories
        }
      }} series={[
        {
          name: 'New words',
          data: seriesNew
        },
        {
          name: 'Learned words',
          data: seriesLearned
        }
      ]} type="area" height={450} />
    </Container>
  );
}
