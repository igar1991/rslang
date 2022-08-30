import './words-view.css';
import { useAppSelector } from '../../../../redux/hooks';
import { selectWords } from '../../../../redux/slices/wordsSlice';
import { VocabularyTab } from '../../../../types/types';
import { VocabularyView } from './vocabulary-view';
import { HardWordsView } from './hard-words-view';

interface ViewProps {
  isMobile: boolean;
}

export const WordsView = ({ isMobile }: ViewProps) => {
  const { selectedTab } = useAppSelector(selectWords);

  if (selectedTab === VocabularyTab.HARD_WORDS) {
    return <HardWordsView isMobile={isMobile} />;
  }

  return <VocabularyView isMobile={isMobile} />;
};
