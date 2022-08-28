import { Box } from '@mui/material';
import { DetailsCardDescription } from './card-description';
import './word-details-card.css';
import { wordsAPI } from '../../../../api/wordsService';
import { API_BASE_URL } from '../../../../api/api';
import { DetailsCardButton } from './details-card-button';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { markWordAsHard, markWordAsLearned, removeWordFromHard } from '../../../../redux/slices/wordsSlice';
import { useAppSelector } from '../../../../redux/hooks';
import { Word } from '../../../../types/types';
import { DIFFICULTY } from '../constants';

interface Props {
  word: Word;
}

export const WordDetailsCard = ({ word }: Props) => {
  const dispatch = useDispatch();
  const isUserLoggedIn = useAppSelector((state) => state.auth.isAuth);
  const selectedWordColor = useAppSelector((state) => state.words.selectedWordColor);
  const userId = useAppSelector((state) => state.auth.id);
  const usersHardWords = useAppSelector((state) => state.words.usersHardWords);

  const isHardWord = usersHardWords.map(({ id }) => id).includes(word.id);

  const { data: allUserWords } = wordsAPI.useGetUserWordsQuery(userId);
  const [addUserWord] = wordsAPI.useAddUserWordMutation();
  const [updateUserWord, { isLoading: isUpdating }] = wordsAPI.useUpdateUserWordMutation();

  const isNeedToCreate = allUserWords && !allUserWords.map(({ wordId }) => wordId).includes(word.id);

  const handleClickHardWord = useCallback(() => {
    if (word && !isHardWord) {
      dispatch(markWordAsHard(word));
    }

    if (word && isHardWord) {
      dispatch(removeWordFromHard(word));
    }

    if (word && isNeedToCreate) {
      addUserWord({
        id: userId,
        wordId: word.id,
        body: {
          difficulty: DIFFICULTY.HARD,
          optional: {}
        }
      });
    }

    if (word && !isUpdating && !isNeedToCreate) {
      updateUserWord({
        id: userId,
        wordId: word.id,
        body: {
          difficulty: DIFFICULTY.EASY,
          optional: {}
        }
      });
    }
  }, [word, isHardWord, dispatch]);

  const handleClickLearnedWord = useCallback(() => {
    if (word) {
      dispatch(markWordAsLearned(word));
    }
  }, [word, dispatch]);

  return (
    <Box className='word__details-card'>
      <Box
        component='img'
        alt='Word image'
        src={`${[API_BASE_URL, word.image].join('/')}`}
        className='word__details-card_image'
      />
      {isUserLoggedIn &&
        <Box className='word__details-card-buttons-group'>
          <DetailsCardButton
            handleClick={handleClickHardWord}
            color={selectedWordColor}
            title={isHardWord ? 'Easy word' : 'Hard word'}
          />
          <DetailsCardButton
            handleClick={handleClickLearnedWord}
            color={selectedWordColor}
            title={'Learned word'}
          />
        </Box>
      }
      <DetailsCardDescription selectedWord={word} />
    </Box>
  );
};
