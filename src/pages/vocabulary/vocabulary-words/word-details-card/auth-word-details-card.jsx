import { useLearnedWordsData } from 'pages/hooks';
import { WordDetailsCard } from '.';

export const AuthWordDetailsCard = () => {
  const { data, usersWords, userStatistics } = useLearnedWordsData();

  return <WordDetailsCard data={data} usersWords={usersWords} userStatistics={userStatistics} />;
};
