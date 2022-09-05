import { useAppSelector } from 'redux/hooks';
import { selectAuth } from 'redux/slices/authUserSlice';
import AuthStatisticRender from './statistic-render/auth-statistic-render';
import StatisticsRender from './statistic-render';

export default function Statistics() {
  const { isAuth: isUserLoggedIn } = useAppSelector(selectAuth);

  return <>{isUserLoggedIn ? <AuthStatisticRender /> : <StatisticsRender data={undefined} />}</>;
}
