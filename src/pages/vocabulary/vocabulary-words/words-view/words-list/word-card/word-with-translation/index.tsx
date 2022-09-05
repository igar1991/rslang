import { Box, Typography } from '@mui/material';

interface Props {
  word: string;
  wordTranslate: string;
}

export const WordWithTranslation = ({ word, wordTranslate }: Props) => {
  return (
    <Box className='words-card-description'>
      <Typography
        variant='h5'
        className='word-card__title'
      >
        {word}
      </Typography>
      <Typography
        variant='caption'
        className='word-card__translation'
      >
        {wordTranslate}
      </Typography>
    </Box>
  );
};
