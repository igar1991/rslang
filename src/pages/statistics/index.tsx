import { useAppSelector } from 'redux/hooks';
import { selectAuth } from 'redux/slices/authUserSlice';
import AuthStatisticRender from './statistic-render/auth-statistic-render';
import StatisticsRender from './statistic-render';

export interface statData {
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
  const { isAuth: isUserLoggedIn, createStatistic } = useAppSelector(selectAuth);

  return (
    <>
      {isUserLoggedIn && createStatistic ? (
        <AuthStatisticRender />
      ) : (
        <StatisticsRender data={undefined} dataStatistic={undefined} />
      )}
    </>
  );
}
