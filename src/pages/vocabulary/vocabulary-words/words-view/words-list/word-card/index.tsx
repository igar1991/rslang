import './word-card.css';
import { IconButton } from '@mui/material';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setSelectedWordColor, setSelectedWordId } from '../../../../../../redux/slices/wordsSlice';
import { StyledWordCardWrapper } from './StyledWordCardWrapper';
import { useAppSelector } from '../../../../../../redux/hooks';
import { GROUPS } from '../../../constants';
import { Colors, ColorsByGroupMap } from '../../words-levels/constants';
import { Word } from '../../../../../../types/types';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import { WordWithTranslation } from './word-with-translation';

interface WordCardProps {
  word: Word;
}

export const WordCard = ({ word: { word, wordTranslate, id, group } }: WordCardProps) => {
  const dispatch = useDispatch();
  const selectedWordId = useAppSelector((state) => state.words.selectedWordId);
  const usersHardWords = useAppSelector((state) => state.words.usersHardWords);
  const onSelectWord = useCallback(() => {
    dispatch(setSelectedWordColor(color));
    dispatch(setSelectedWordId(id));
  }, [dispatch, id]);
  const isHardWord = usersHardWords.map(({ id }) => id).includes(id);

  const color = ColorsByGroupMap.get(GROUPS[group]) as Colors;

  return (
    <StyledWordCardWrapper
      className='words__word-card'
      id={id}
      isActive={selectedWordId === id}
      onClick={onSelectWord}
      color={color}
    >
      <WordWithTranslation
        word={word}
        wordTranslate={wordTranslate}
      />
      {isHardWord &&
        <IconButton
          disableRipple
          size='small'
          className='hard-word-icon'
        >
          <FitnessCenterIcon />
        </IconButton>
      }
    </StyledWordCardWrapper>
  );
};
