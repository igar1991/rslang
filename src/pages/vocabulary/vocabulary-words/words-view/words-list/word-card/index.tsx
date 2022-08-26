import './word-card.css';
import { Typography } from '@mui/material';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setSelectedWordId } from '../../../../../../redux/slices/wordsSlice';
import { StyledWordCardWrapper } from './StyledWordCardWrapper';
import { useGroupColor } from '../../../../../hooks';
import { useAppSelector } from '../../../../../../redux/hooks';

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
  const color = useGroupColor();
  const selectedWordId = useAppSelector((state) => state.words.selectedWordId);

  return (
    <StyledWordCardWrapper
      className='words__word-card'
      id={id}
      isActive={selectedWordId === id}
      onClick={onSelectWord}
      color={color}
    >
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
        {translation}
      </Typography>
    </StyledWordCardWrapper>
  );
};
