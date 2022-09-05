import { useAppSelector } from 'redux/hooks';
import { selectAuth } from 'redux/slices/authUserSlice';
import GemesAuthRender from '../components/auth-render';
import SprintRender from './sprint-render';

export default function Sprint() {
  const { isAuth: isUserLoggedIn } = useAppSelector(selectAuth);

  return <>{isUserLoggedIn ? <GemesAuthRender game='sprint' /> : <SprintRender learnedWords={[]} dataStatistic={null} />}</>;
}
