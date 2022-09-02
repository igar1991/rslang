import { Box, Typography } from '@mui/material';

interface Props {
  img: string;
  title: string;
  word: number;
  trueans: number;
  long: number;
}

export const Card = ({ img, title, word, trueans, long }: Props) => {
  return (
    <Box className='game__card-description'>
      <Box
        component='img'
        alt={`${title} game image`}
        src={img}
        sx={{
          height: {
            xs: 95,
            md: 150,
          }
        }}
      />
      <Box sx={{marginTop: '20px'}}>
        <Typography variant='h5' className='game-title'>{title}</Typography>
        <Typography variant='body1' className='game-description'>{`New words: ${word}`}</Typography>
        <Typography variant='body1' className='game-description'>{`Correct answers: ${trueans}%`}</Typography>
        <Typography variant='body1' className='game-description'>{`Longest series of correct answers: ${long}`}</Typography>
      </Box>
    </Box>
  );
};
