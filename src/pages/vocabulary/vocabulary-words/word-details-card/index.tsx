import { Box } from '@mui/material';
import { DetailsCardDescription } from './card-description';
import './word-details-card.css';
import { wordsAPI } from '../../../../api/wordsService';
import { API_BASE_URL } from '../../../../api/api';
import { DetailsCardButton } from './details-card-button';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { markWordAsHard } from '../../../../redux/slices/wordsSlice';
import { useAppSelector } from '../../../../redux/hooks';

interface Props {
  id: string;
}

export const WordDetailsCard = ({ id }: Props) => {
  const dispatch = useDispatch();
  const isUserLoggedIn = useAppSelector((state) => state.auth.isAuth);

  const { data, isSuccess } = wordsAPI.useGetWordByIdQuery(id);
  const handleClick = useCallback(() => {
    if (data) {
      dispatch(markWordAsHard(data));
    }
  }, [data, dispatch]);

  return isSuccess ? (
    <Box className='word__details-card'>
      <Box
        component='img'
        alt='Word image'
        src={`${[API_BASE_URL, data.image].join('/')}`}
        className='word__details-card_image'
      />
      {isUserLoggedIn &&
        <Box className='word__details-card-buttons-group'>
          <DetailsCardButton
            handleClick={handleClick}
            title={'Hard word'}
          />
          <DetailsCardButton
            handleClick={handleClick}
            title={'Known word'}
          />
        </Box>
      }
      <DetailsCardDescription selectedWord={data} />
    </Box>
  ) : null;
};
