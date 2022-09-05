import { Box, Container, Typography } from '@mui/material';
import { Card } from '../components/card';
import { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { useAppSelector } from 'redux/hooks';
import { selectAuth } from 'redux/slices/authUserSlice';
import { Statistics, UserWordData } from 'types/types';
import { Achievements } from 'pages/statistics/components/achievements';
import '../statistics.css';

interface statData {
  date: string;
  sprint: {
    rightAnswers: number;
    errorAnswers: number;
    newWords: number;
    series: number;
  };
  audioCall: {
    rightAnswers: number;
    errorAnswers: number;
    newWords: number;
    series: number;
  };
}

type Props = {data: UserWordData[] | undefined; dataStatistic: Statistics | undefined}

export default function StatisticsRender({data, dataStatistic} : Props) {
  const [categories, setСategories] = useState<Set<string>>();
  const [seriesNew, setSeriesNew] = useState<number[]>([]);
  const [seriesLearned, setSeriesNewLearned] = useState<number[]>([]);
  const [stat, setStat] = useState<statData>();
  const { id, isAuth: isUserLoggedIn, createStatistic } = useAppSelector(selectAuth);

  const localStatistic = localStorage.getItem('localStatistic');

  useEffect(() => {
    if (data) createFilter(data);
  }, [data]);

  useEffect(() => {
    if(dataStatistic) {
      setStat(dataStatistic.optional.statToday);
    }
    if (localStatistic && !dataStatistic) setStat(JSON.parse(localStatistic));
  }, [dataStatistic, localStatistic]);

  const createFilter = (data: UserWordData[]) => {
    const dataFilter = data?.filter(
      (item) =>
        Object.keys(item.optional).includes('date') && item.optional.learned
    );
    const resLearned = dataFilter?.reduce(
      (previousValue: { [key: string]: number }, currentValue) => {
        if (
          Object.keys(previousValue).includes(
            currentValue.optional.date as string
          )
        ) {
          if (currentValue.optional.date) {
            previousValue[currentValue.optional.date] += 1;
          }
        } else {
          if (currentValue.optional.date) {
            previousValue[currentValue.optional.date] = 1;
          }
        }
        return previousValue;
      },
      {}
    );
    setSeriesNewLearned(Object.values(resLearned));
    const dataFilterFirst = data?.filter((item) =>
      Object.keys(item.optional).includes('games')
    );
    const resFirst = dataFilterFirst?.reduce(
      (previousValue: { [key: string]: number }, currentValue) => {
        if (currentValue.optional.games) {
          if (
            Object.keys(previousValue).includes(
              currentValue.optional.games.firstDate as string
            )
          ) {
            previousValue[currentValue.optional.games.firstDate] += 1;
          } else {
            previousValue[currentValue.optional.games.firstDate] = 1;
          }
        }
        return previousValue;
      },
      {}
    );
    setSeriesNew(Object.values(resFirst));
    setСategories(
      new Set([...Object.keys(resLearned), ...Object.keys(resFirst)])
    );
  };

  const countNewWords = (stat: statData): number =>
    (stat?.sprint ? stat.sprint?.newWords : 0) + (stat?.audioCall ? stat.audioCall?.newWords : 0);

  const precentWord = (trueAns: number, wrongAns: number) =>
    (trueAns + wrongAns === 0) ? 0 : Math.floor((trueAns * 100) / (trueAns + wrongAns));

  return (
    <Container className='container'>
      <h2 className='title'>Statistics for today</h2>
      <div className='container_result'>
        <Box className='container_result-games'>
          <Box>
            <h2 className='title_num'>{stat ? countNewWords(stat) : 0}</h2>
            <h4>New words</h4>
          </Box>
          <Box className='game__card game__card-statistics'>
            <Card
              img='/assets/game-sprint.png'
              title='Sprint'
              word={stat?.sprint ? stat.sprint.newWords : 0}
              trueans={
                stat?.sprint
                  ? precentWord(
                    stat.sprint.rightAnswers,
                    stat.sprint.errorAnswers
                  )
                  : 0
              }
              long={stat?.sprint ? stat.sprint.series : 0}
            />
          </Box>
        </Box>
        <Box className='container_result-games'>
          <Box>
            <h2 className='title_num'>
              {stat ?
                precentWord(
                  (stat?.sprint ? stat.sprint?.rightAnswers : 0) + (stat?.audioCall ? stat.audioCall?.rightAnswers : 0),
                  (stat?.sprint ? stat.sprint?.errorAnswers : 0) + (stat?.audioCall ? stat.audioCall?.errorAnswers : 0)
                ) : 0}
              %
            </h2>
            <h4>Correct answers</h4>
          </Box>
          <Box className='game__card game__card-statistics'>
            <Card
              img='/assets/game-listen.png'
              title='Audio Challenge'
              word={stat?.audioCall ? stat.audioCall.newWords : 0}
              trueans={
                stat?.audioCall
                  ? precentWord(
                    stat.audioCall.rightAnswers,
                    stat.audioCall.errorAnswers
                  )
                  : 0
              }
              long={stat?.audioCall ? stat.audioCall.series : 0}
            />
          </Box>
        </Box>
      </div>
      {isUserLoggedIn && createStatistic && <Achievements />}
      <Typography
        sx={{ marginTop: '40px' }}
        variant='h4'
        className='long-term-statistics'
      >
        Statistics for all time
      </Typography>
      {!isUserLoggedIn && <Typography
        sx={{ marginTop: '20px' }}
        variant='h6'
      >
        Statistics are available only to authorized users
      </Typography>}
      {id && (
        <ReactApexChart
          options={{
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
              categories: categories ? Array.from(categories) : []
            }
          }}
          series={[
            {
              name: 'New words',
              data: seriesNew
            },
            {
              name: 'Learned words',
              data: seriesLearned
            }
          ]}
          type='area'
          height={450}
        />
      )}
    </Container>
  );
}
