import { useAppSelector } from '../../../../redux/hooks';
import { VocabularyTab, Word } from '../../../../types/types';
import { wordsAPI } from '../../../../api/wordsService';

export const getWordsData = (): { data: Word[] | undefined, isSuccess: boolean } => {
  const group = useAppSelector((state) => state.words.group);
  const page = useAppSelector((state) => state.words.page);
  const selectedTab = useAppSelector((state) => state.words.selectedTab);
  const hardWords = useAppSelector((state) => state.words.usersHardWords);
  const { data, isSuccess } = wordsAPI.useGetWordsQuery({ page, group });

  if (selectedTab === VocabularyTab.VOCABULARY) {
    return { data, isSuccess };
  }

  return { data: hardWords, isSuccess: true };
};
