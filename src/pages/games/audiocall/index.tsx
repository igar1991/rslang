import { useAppSelector } from 'redux/hooks';
import { selectAuth } from 'redux/slices/authUserSlice';
import { selectGames } from 'redux/slices/gamesSlice';
import GemesAuthRender from '../components/auth-render';
import AudioCallRender from './audiocall-render';

export default function AudioCall() {
  const { fromVoc } = useAppSelector(selectGames);
  const { isAuth: isUserLoggedIn } = useAppSelector(selectAuth);

  return <>{fromVoc && isUserLoggedIn ? <GemesAuthRender game='audioCall' /> : <AudioCallRender learnedWords={[]} />}</>;
}
