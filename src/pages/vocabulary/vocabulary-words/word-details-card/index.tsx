import { Box } from '@mui/material';
import { DetailsCardDescription } from './card-description';
import './word-details-card.css';
import { wordsAPI } from 'api/wordsService';
import { API_BASE_URL } from 'api/api';
import { DetailsCardButton } from './details-card-button';
import { selectWords } from 'redux/slices/wordsSlice';
import { useAppSelector } from 'redux/hooks';
import { DIFFICULTY } from '../constants';
import { selectAuth } from 'redux/slices/authUserSlice';
import { useCallback } from 'react';

export const WordDetailsCard = () => {
  const { isAuth: isUserLoggedIn, id: userId } = useAppSelector(selectAuth);
  const { selectedWordColor, selectedWordId } = useAppSelector(selectWords);

  const { data: word, isSuccess: isWordLoaded } = wordsAPI.useGetWordByIdQuery(selectedWordId);
  const { data: usersWords, isSuccess: isUserWordsLoaded } = wordsAPI.useGetUserWordsQuery(userId);

  const usersHardWordsIds = isUserWordsLoaded ? usersWords
    .reduce((acc, word) => {
      if (word.difficulty === DIFFICULTY.HARD) {
        acc.push(word.wordId);
      }

      return acc;
    }, [] as string[]) : [];

  const usersLearnedWordsIds = isUserWordsLoaded ? usersWords
    .reduce((acc, word) => {
      if (word.optional.learned) {
        acc.push(word.wordId);
      }

      return acc;
    }, [] as string[]): [];

  const [addUserWord] = wordsAPI.useAddUserWordMutation();
  const [updateUserWord, { isLoading: isUpdating }] = wordsAPI.useUpdateUserWordMutation();

  const isNeedToCreate = word && isUserWordsLoaded && !usersWords.map(({ wordId }) => wordId).includes(word.id);
  const isHardWord = word && usersHardWordsIds.includes(word.id);
  const isLearnedWord = word && usersLearnedWordsIds.includes(word.id);

  const handleClickHardWord = useCallback(() => {
    if (word && isNeedToCreate) {
      addUserWord({
        id: userId,
        wordId: word.id,
        body: {
          difficulty: DIFFICULTY.HARD,
          optional: {
            learned: false,
          }
        }
      });
    }

    if (word && !isUpdating && !isNeedToCreate) {
      const currentWordDifficulty = usersWords?.find((userWord) => userWord.wordId === word.id)?.difficulty;

      updateUserWord({
        id: userId,
        wordId: word.id,
        body: {
          difficulty: currentWordDifficulty === 'easy' ? DIFFICULTY.HARD : DIFFICULTY.EASY,
          optional: {
            learned: false
          }
        }
      });
    }
  }, [addUserWord, isNeedToCreate, isUpdating, updateUserWord, userId, usersWords, word]);

  const handleClickLearnedWord = useCallback(() => {
    if (word && isNeedToCreate) {
      addUserWord({
        id: userId,
        wordId: word.id,
        body: {
          difficulty: DIFFICULTY.EASY,
          optional: {
            learned: true,
            date: (new Date()).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }),
          }
        }
      });
    }

    if (word && !isUpdating && !isNeedToCreate) {
      updateUserWord({
        id: userId,
        wordId: word.id,
        body: {
          difficulty: DIFFICULTY.EASY,
          optional: {
            learned: true,
            date: (new Date()).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }),
          }
        }
      });
    }
  }, [addUserWord, isNeedToCreate, isUpdating, updateUserWord, userId, word]);

  return isWordLoaded ? (
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
            disabled={isLearnedWord ?? false}
          />
          <DetailsCardButton
            handleClick={handleClickLearnedWord}
            color={selectedWordColor}
            title={'Learned word'}
            disabled={isLearnedWord ?? false}
          />
        </Box>
      }
      <DetailsCardDescription selectedWord={word} />
    </Box>
  ) : null;
};
