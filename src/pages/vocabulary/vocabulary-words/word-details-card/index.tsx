import { Box } from '@mui/material';
import { DetailsCardDescription } from './card-description';
import { wordsAPI } from 'api/wordsService';
import { API_BASE_URL } from 'api/api';
import { DetailsCardButton } from './details-card-button';
import { selectWords } from 'redux/slices/wordsSlice';
import { useAppSelector } from 'redux/hooks';
import { DIFFICULTY } from '../constants';
import { selectAuth } from 'redux/slices/authUserSlice';
import { useCallback, useEffect, useState } from 'react';
import { Achievement, UserWordData } from 'types/types';
import { DetailsCardStatistics } from 'pages/vocabulary/vocabulary-words/word-details-card/word-statistics';
import { useDevice } from 'pages/hooks';
import './word-details-card.css';
import { AchievementPopup } from 'pages/statistics/components/achievements/achievement-popup';

interface Props {
  data: AggregatedWord[] | undefined;
  usersWords: UserWordData[] | undefined;
}

export const WordDetailsCard = ({data, usersWords}: Props) => {
  const { isAuth: isUserLoggedIn, id: userId } = useAppSelector(selectAuth);
  const { selectedWordColor, selectedWordId } = useAppSelector(selectWords);
  
  const device = useDevice();

  const device = useDevice();

  const { data: word, isSuccess: isWordLoaded } = wordsAPI.useGetWordByIdQuery(selectedWordId);
  const { data: usersWords, isSuccess: isUserWordsLoaded } = wordsAPI.useGetUserWordsQuery(userId);
  const { data: userStatistics } = wordsAPI.useGetUserStatisticsQuery(userId);
  const [createStatistics] = wordsAPI.useUpdateUserStatisticsMutation();

  const [learnedWordsCount, setLearnedWordsCount] = useState(0);
  const [show, setShow] = useState(false);
  const [achievementImage, setAchievementImage] = useState('');
  const [achievementTitle, setAchievementTitle] = useState('');
  const [achievementDescription, setAchievementDescription] = useState('');

  useEffect(() => {
    if (userStatistics) {
      setLearnedWordsCount(userStatistics.learnedWords);
    }

    if (userStatistics && learnedWordsCount === 5) {
      setShow(true);
      setAchievementImage((userStatistics.optional.achievements.achievement2 as Achievement).img);
      setAchievementTitle((userStatistics.optional.achievements.achievement2 as Achievement).name);
      setAchievementDescription((userStatistics.optional.achievements.achievement2 as Achievement).description);

      // TODO: fix show only first time
      // createStatistics({
      //   id: userId,
      //   body: {
      //     ...userStatistics,
      //     optional: {
      //       ...userStatistics.optional,
      //       achievements: {
      //         ...userStatistics.optional.achievements,
      //         achievement2: {
      //           ...userStatistics.optional.achievements.achievement2,
      //           shown: true,
      //         } as Achievement,
      //       }
      //     }
      //   }
      // });
    }
  }, [setLearnedWordsCount, createStatistics, userId, userStatistics, learnedWordsCount]);

  const handleCloseDialog = () => {
    setShow(false);
  };

  const usersHardWordsIds = usersWords ? usersWords
    .reduce((acc, word) => {
      if (word.difficulty === DIFFICULTY.HARD) {
        acc.push(word.wordId);
      }

      return acc;
    }, [] as string[]) : [];

  const usersLearnedWordsIds = usersWords ? usersWords
    .reduce((acc, word) => {
      if (word.optional.learned) {
        acc.push(word.wordId);
      }

      return acc;
    }, [] as string[]) : [];

  const [addUserWord] = wordsAPI.useAddUserWordMutation();
  const [updateUserWord, { isLoading: isUpdating }] = wordsAPI.useUpdateUserWordMutation();

  const isNeedToCreate = word && usersWords && !usersWords.map(({ wordId }) => wordId).includes(word.id);
  const isHardWord = word && usersHardWordsIds.includes(word.id);
  const isLearnedWord = word && usersLearnedWordsIds.includes(word.id);
  const currentWord = word && usersWords?.find((userWord) => userWord.wordId === word.id) as UserWordData;

  const handleClickHardWord = useCallback(() => {
    if (word && isNeedToCreate) {
      addUserWord({
        id: userId,
        wordId: word.id,
        body: {
          difficulty: DIFFICULTY.HARD,
          optional: {
            learned: false
          }
        }
      });
    }

    if (word && !isUpdating && !isNeedToCreate) {
      const requestPayload = Object.assign({}, {
        optional: (currentWord as UserWordData).optional,
        difficulty: currentWord?.difficulty === 'easy' ? DIFFICULTY.HARD : DIFFICULTY.EASY
      });

      updateUserWord({ id: userId, wordId: word.id, body: requestPayload });
    }
  }, [addUserWord, isNeedToCreate, isUpdating, updateUserWord, userId, word, currentWord]);

  const handleClickLearnedWord = useCallback(() => {
    if (word && isNeedToCreate) {
      addUserWord({
        id: userId,
        wordId: word.id,
        body: {
          difficulty: DIFFICULTY.EASY,
          optional: {
            learned: true,
            date: (new Date()).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })
          }
        }
      });
    }

    if (word && !isUpdating && !isNeedToCreate) {
      const requestPayload = Object.assign({}, {
        optional: {
          ...(currentWord as UserWordData).optional,
          learned: true,
          date: (new Date()).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })
        },
        difficulty: DIFFICULTY.EASY
      });

      updateUserWord({ id: userId, wordId: word.id, body: requestPayload });
    }

    if (userStatistics) {
      const learnedWordsCounter = userStatistics.learnedWords;

      createStatistics({
        id: userId,
        body: { learnedWords: learnedWordsCounter + 1, optional: { ...userStatistics.optional } }
      });
    }
  }, [addUserWord, isNeedToCreate, isUpdating, updateUserWord, userId, word, currentWord, userStatistics, createStatistics]);

  const isAllWordsLearned = isUserLoggedIn && data && data.length === 20;

  return isWordLoaded ? (
    <Box className={isAllWordsLearned ? 'word__details-card disabled' : 'word__details-card'}>
      <AchievementPopup
        show={show}
        handleCloseDialog={handleCloseDialog}
        title={achievementTitle}
        description={achievementDescription}
        image={achievementImage}
      />
      <Box className='word__details-card-wrapper'>
        <Box
          component='img'
          alt='Word image'
          src={`${[API_BASE_URL, word.image].join('/')}`}
          className={isAllWordsLearned ? 'word__details-card_image disabled' : 'word__details-card_image'}
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
      {isUserLoggedIn && <DetailsCardStatistics
        device={device}
        color={selectedWordColor}
        wordId={selectedWordId}
        userId={userId}
      />}
    </Box>
  ) : null;
};
