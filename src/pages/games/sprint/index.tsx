import { useAppSelector } from 'redux/hooks';
import { selectAuth } from 'redux/slices/authUserSlice';
import { selectGames } from 'redux/slices/gamesSlice';
import GemesAuthRender from '../components/auth-render';
import SprintRender from './sprint-render';

export default function Sprint() {
  const { fromVoc } = useAppSelector(selectGames);
  const { isAuth: isUserLoggedIn } = useAppSelector(selectAuth);

  return <>{fromVoc && isUserLoggedIn ? <GemesAuthRender game='sprint' /> : <SprintRender learnedWords={[]} />}</>;
}
