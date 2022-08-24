import { Box } from '@mui/material';
import { DetailsCardDescription } from './card-description';
import './word-details-card.css';
import { wordsAPI } from '../../../../api/wordsService';
import { API_BASE_URL } from '../../../../api/api';

interface Props {
  id: string;
}

export const WordDetailsCard = ({ id }: Props) => {
  const { data, isSuccess } = wordsAPI.useGetWordByIdQuery(id);

  return isSuccess ? (
    <Box className='word__details-card'>
      <Box
        component='img'
        alt='Word image'
        src={`${[API_BASE_URL, data.image].join('/')}`}
        className='word__details-card_image'
      />
      <DetailsCardDescription selectedWord={data} />
    </Box>
  ) : null;
};
