import { useAppSelector } from 'redux/hooks';
import { selectAuth } from 'redux/slices/authUserSlice';
import { UserWordData } from 'types/types';
import { Achievements } from 'pages/statistics/components/achievements';

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
  const { isAuth: isUserLoggedIn } = useAppSelector(selectAuth);

  return <>{isUserLoggedIn ? <AuthStatisticRender /> : <StatisticsRender data={undefined} />}</>;
}
