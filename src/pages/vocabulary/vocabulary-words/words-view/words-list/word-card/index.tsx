import './word-card.css';
import { Typography } from '@mui/material';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setSelectedWordId } from '../../../../../../redux/slices/wordsSlice';

interface WordCardProps {
  word: string;
  translation: string;
  id: string;
}

export const WordCard = ({ word, translation, id }: WordCardProps) => {
  const dispatch = useDispatch();
  const onSelectWord = useCallback(() => {
    dispatch(setSelectedWordId(id));
  }, [dispatch, id]);

  return (
    <div className='words__word-card' onClick={onSelectWord}>
      <Typography variant='h5' className='word-card__title'>{word}</Typography>
      <Typography variant='caption' className='word-card__translation'>{translation}</Typography>
    </div>
  );
};
