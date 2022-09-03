import './word-card.css';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { selectWords, setSelectedWordColor, setSelectedWordId } from 'redux/slices/wordsSlice';
import { StyledWordCardWrapper } from './StyledWordCardWrapper';
import { useAppSelector } from 'redux/hooks';
import { GROUPS } from '../../../constants';
import { Colors, ColorsByGroupMap } from '../../words-levels/constants';
import { Word } from 'types/types';
import { WordWithTranslation } from './word-with-translation';
import { HardLearnedIconsGroup } from './hard-learned-icons';

interface WordCardProps {
  word: Word;
  isHardWord: boolean;
  isLearnedWord: boolean;
}

export const WordCard = ({ word: { word, wordTranslate, id, group }, isHardWord, isLearnedWord }: WordCardProps) => {
  const dispatch = useDispatch();
  const { selectedWordId } = useAppSelector(selectWords);
  const color = ColorsByGroupMap.get(GROUPS[group]) as Colors;

  const onSelectWord = useCallback(() => {
    dispatch(setSelectedWordColor(color));
    dispatch(setSelectedWordId(id));
  }, [dispatch, id, color]);

  return (
    <StyledWordCardWrapper
      className={isLearnedWord ? 'words__word-card disabled' : 'words__word-card'}
      id={id}
      isActive={selectedWordId === id}
      onClick={onSelectWord}
      color={color}
    >
      <WordWithTranslation
        word={word}
        wordTranslate={wordTranslate}
      />
      <HardLearnedIconsGroup
        isHardWord={isHardWord}
        isLearnedWord={isLearnedWord}
        color={color}
      />
    </StyledWordCardWrapper>
  );
};
