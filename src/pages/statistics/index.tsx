import { Box, Container, Typography } from '@mui/material';
import { Card } from './components/card';
import './statistics.css';
import { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { wordsAPI } from 'api/wordsService';
import { useAppSelector } from 'redux/hooks';
import { selectAuth } from 'redux/slices/authUserSlice';
import { UserWordData } from 'types/types';

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

export default function Statistics() {
  const [categories, setСategories] = useState<Set<string>>();
  const [seriesNew, setSeriesNew] = useState<number[]>([]);
  const [seriesLearned, setSeriesNewLearned] = useState<number[]>([]);
  const [stat, setStat] = useState<statData>();
  const { id } = useAppSelector(selectAuth);

  const { data } = wordsAPI.useGetUserWordsQuery(id);
  const localStatistic = localStorage.getItem('localStatistic');

  useEffect(() => {
    if (data) createFilter(data);
  }, [data]);

  useEffect(() => {
    if (localStatistic) setStat(JSON.parse(localStatistic));
  }, [localStatistic]);

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
    stat.sprint.newWords + stat.audioCall.newWords;

  const precentWord = (trueAns: number, wrongAns: number) =>
    Math.floor((trueAns * 100) / (trueAns + wrongAns));

  return (
    <Container className="container">
      <h2 className="title">Statistics for today</h2>
      <div className="container_result">
        <Box>
          <h2 className="title_num">{stat && countNewWords(stat)}</h2>
          <h4>New words</h4>
        </Box>
        <Box>
          <h2 className="title_num">
            {stat &&
              precentWord(
                stat.sprint.rightAnswers + stat.audioCall.rightAnswers,
                stat.sprint.errorAnswers + stat.audioCall.errorAnswers
              )}
            %
          </h2>
          <h4>Сorrect answers</h4>
        </Box>
      </div>
      <div className="container_result">
        <Box className="game__card">
          <Card
            img="/assets/game-sprint.png"
            title="Sprint"
            word={stat ? stat.sprint.newWords : 0}
            trueans={
              stat
                ? precentWord(
                  stat.sprint.rightAnswers,
                  stat.sprint.errorAnswers
                )
                : 0
            }
            long={stat ? stat.sprint.series : 0}
          />
        </Box>
        <Box className="game__card">
          <Card
            img="/assets/game-listen.png"
            title="Audio Challenge"
            word={stat ? stat.audioCall.newWords : 0}
            trueans={
              stat
                ? precentWord(
                  stat.audioCall.rightAnswers,
                  stat.audioCall.errorAnswers
                )
                : 0
            }
            long={stat ? stat.audioCall.series : 0}
          />
        </Box>
      </div>
      <Typography sx={{ marginTop: '60px' }} variant="h4">
        Statistics for all time
      </Typography>
      <Typography sx={{ marginTop: '20px' }} variant="h6">
        Statistics are available only to authorized users
      </Typography>
      {id && (
        <ReactApexChart
          options={{
            chart: {
              height: 450,
              type: 'area',
              toolbar: {
                show: false,
              },
            },
            dataLabels: {
              enabled: true,
            },
            stroke: {
              curve: 'smooth',
              width: 2,
            },
            grid: {
              strokeDashArray: 0,
            },
            xaxis: {
              categories: categories,
            },
          }}
          series={[
            {
              name: 'New words',
              data: seriesNew,
            },
            {
              name: 'Learned words',
              data: seriesLearned,
            },
          ]}
          type="area"
          height={450}
        />
      )}
    </Container>
  );
}
