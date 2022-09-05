import { useAppSelector } from 'redux/hooks';
import { selectAuth } from 'redux/slices/authUserSlice';
import GemesAuthRender from '../components/auth-render';
import AudioCallRender from './audiocall-render';

export default function AudioCall() {
  const { isAuth: isUserLoggedIn } = useAppSelector(selectAuth);

  return <>{isUserLoggedIn ? <GemesAuthRender game='audioCall' /> : <AudioCallRender learnedWords={[]} dataStatistic={null} />}</>;
}
