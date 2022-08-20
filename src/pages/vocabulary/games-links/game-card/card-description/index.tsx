import { Box, Typography } from '@mui/material';

interface Props {
  img: string;
  title: string;
  description: string;
}

export const CardDescription = ({ img, title, description }: Props) => {
  return (
    <Box className='game__card-description'>
      <Box
        component='img'
        alt='Sprint game image'
        src={img}
        sx={{
          height: {
            xs: 95,
            md: 150,
          }
        }}
      />
      <Box className='card-description__details'>
        <Typography variant='h6' className='game-title'>{title}</Typography>
        <Typography variant='body1' className='game-description'>{description}</Typography>
      </Box>
    </Box>
  );
};
