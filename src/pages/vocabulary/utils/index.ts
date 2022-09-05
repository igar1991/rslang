import { useAppSelector } from 'redux/hooks';
import { Word } from 'types/types';
import { wordsAPI } from 'api/wordsService';
import { selectWords } from 'redux/slices/wordsSlice';

export const useVocabularyWordsData = (): { data: Word[] | undefined, isSuccess: boolean } => {
  const { group, page } = useAppSelector(selectWords);
  const { data: allWords, isSuccess } = wordsAPI.useGetWordsQuery({ page, group });

  return { data: allWords, isSuccess };
};
