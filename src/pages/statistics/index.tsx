import { Box, Container, Typography } from '@mui/material';
import { Card } from './components/card';
import './statistics.css';
import { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';

interface series {
  name: string;
  data: number[]
}

export default function Statistics() {

  const [categories, setСategories] = useState<number[]>([]);
  const [series, setSeries] = useState<series[]>([]);
  
  useEffect(() => {
    setSeries([
      {
        name: 'New words',
        data: [0, 2, 3, 4, 5, 6, 7]
      },
      {
        name: 'Learned words',
        data: [2, 3, 4, 5, 6, 7, 4]
      }
    ]);
    setСategories([1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]);

  }, []);

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
      }} series={series} type="area" height={450} />
    </Container>
  );
}
