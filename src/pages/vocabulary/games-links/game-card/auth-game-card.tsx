import { useLearnedWordsData } from 'pages/hooks';
import { GameCard } from '.';

interface Props {
  img: string;
  title: string;
  description: string;
  url: string;
}

export const AuthGameCard = ({ img, title, description, url }: Props) => {
  const { data } = useLearnedWordsData();

  return <GameCard data={data} img={img} title={title} description={description} url={url} />;
};
