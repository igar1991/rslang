import { Box, Typography } from '@mui/material';
import { useDevice } from 'pages/hooks';
import '../../vocabulary/games-links/games-link.css';

interface Props {
  img: string;
  title: string;
  word: number;
  trueans: number;
  long: number;
}

const headingByDeviceMap: Map<string, 'h5' | 'h6'> = new Map([
  ['desktop', 'h5'],
  ['tablet', 'h6'],
  ['mobile', 'h6']
]);

export const Card = ({ img, title, word, trueans, long }: Props) => {
  const device = useDevice();

  return (
    <Box className='game__card-description game__card-description-statistics'>
      <Box
        component='img'
        alt={`${title} game image`}
        src={img}
        sx={{
          height: {
            xs: 95,
            md: 150
          }
        }}
      />
      <Box className='card-description__details card-description__statistics-details'>
        <Typography
          variant={headingByDeviceMap.get(device)}
          className='game-title'
        >
          {title}
        </Typography>
        <Typography
          variant='body1'
          className='game-description'
        >
          {`New words: ${word}`}
        </Typography>
        <Typography
          variant='body1'
          className='game-description'
        >
          {`Correct answers: ${trueans}%`}
        </Typography>
        <Typography
          variant='body1'
          className='game-description'
        >
          {`Longest series of correct answers: ${long}`}
        </Typography>
      </Box>
    </Box>
  );
};
