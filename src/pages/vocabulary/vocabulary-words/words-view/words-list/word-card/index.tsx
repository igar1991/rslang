import './word-card.css';
import { Typography } from '@mui/material';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setSelectedWordColor, setSelectedWordId } from '../../../../../../redux/slices/wordsSlice';
import { StyledWordCardWrapper } from './StyledWordCardWrapper';
import { useAppSelector } from '../../../../../../redux/hooks';
import { GROUPS } from '../../../constants';
import { Colors, ColorsByGroupMap } from '../../words-levels/constants';
import { Word } from '../../../../../../types/types';

interface WordCardProps {
  word: Word;
}

export const WordCard = ({ word: { word, wordTranslate, id, group } }: WordCardProps) => {
  const dispatch = useDispatch();
  const selectedWordId = useAppSelector((state) => state.words.selectedWordId);
  const onSelectWord = useCallback(() => {
    dispatch(setSelectedWordColor(color));
    dispatch(setSelectedWordId(id));
  }, [dispatch, id]);

  const color = ColorsByGroupMap.get(GROUPS[group]) as Colors;

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
        {wordTranslate}
      </Typography>
    </StyledWordCardWrapper>
  );
};
