import React, { useEffect, useState } from 'react';
import { Button, Box, Link } from '@mui/material';
import { NavLink } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Slide from '@mui/material/Slide';
import { Word } from 'types/types';

import ResultList from 'pages/games/components/result/result-list';
import 'pages/games/components/result/result.css';
import { newLocalStatistic } from 'pages/games/utils';
import { useAppSelector } from 'redux/hooks';
import { selectAuth } from 'redux/slices/authUserSlice';
import { wordsAPI } from 'api/wordsService';

interface ResultAnswers {
  playAgain: () => void;
  answers: ResultsType;
  game: 'sprint' | 'audioCall';
  series: number;
}

export type ResultsType = {
  right: Word[];
  errors: Word[];
  new: Word[];
};

export const Result = ({ playAgain, answers, game, series }: ResultAnswers) => {
  const [showMore, setShowMore] = useState(false);

  const localStatistic = localStorage.getItem('localStatistic');

  const { id } = useAppSelector(selectAuth);
  const { data } = wordsAPI.useGetUserStatisticsQuery(id);
  const [updateUserStatistics] = wordsAPI.useUpdateUserStatisticsMutation();

  useEffect(()=>{
    if (id) {
      const newDate = new Date().toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      });
      if (data) {
        if (data.optional.statToday?.date !== newDate) {
          updateUserStatistics({
            id: id,
            body: {
              learnedWords: data.learnedWords,
              optional: {
                ...data.optional,
                statToday: {
                  ...data.optional.statToday,
                  date: newDate,
                  [game]: {
                    rightAnswers: answers.right.length,
                    errorAnswers: answers.errors.length,
                    newWords: answers.new.length,
                    series: series,
                  },
                },
              },
            },
          });
        } else {
          const statGame = data.optional.statToday[game];
          
          const newStatGame = {
            rightAnswers: statGame.rightAnswers + answers.right.length,
            errorAnswers: statGame.errorAnswers + answers.errors.length,
            newWords: statGame.newWords + answers.new.length,
            series: statGame.series > series ? statGame.series : series,
          };
          updateUserStatistics({
            id: id,
            body: {
              learnedWords: data.learnedWords,
              optional: {
                ...data.optional,
                statToday: {
                  ...data.optional.statToday,
                  date: newDate,
                  [game]: {
                    ...newStatGame
                  },
                },
              },
            },
          });
        }
      }
    }
  },[id]);

  if (localStatistic) {
    const statistic = JSON.parse(localStatistic);
    const newDate = new Date().toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
    if (statistic.date !== newDate) newLocalStatistic(game, series, answers);
    else {
      const statGame = statistic[game];
      let newStatistic = {};
      if (statGame) {
        const newStatGame = {
          rightAnswers: statGame.rightAnswers + answers.right.length,
          errorAnswers: statGame.errorAnswers + answers.errors.length,
          newWords: statGame.newWords + answers.new.length,
          series: statGame.series > series ? statGame.series : series,
        };
        newStatistic = { ...statistic, [game]: { ...newStatGame } };
      } else {
        newStatistic = {
          ...statistic,
          [game]: {
            rightAnswers: answers.right.length,
            errorAnswers: answers.errors.length,
            newWords: answers.new.length,
            series: series,
          },
        };
      }
      localStorage.setItem('localStatistic', JSON.stringify(newStatistic));
    }
  } else {
    newLocalStatistic(game, series, answers);
  }

  const getTitle = () => {
    if (answers.right.length === 0) return 'Maybe another time...';
    const persent =
      (answers.right.length / (answers.right.length + answers.errors.length)) *
      100;
    if (persent < 40) return 'Next time will be better!';
    if (persent < 70) return 'Not a bad result!';
    if (persent < 90) return 'Good result!';
    return 'Excellent result!';
  };

  return (
    <Box className="result">
      <h2 className="result__title">{getTitle()}</h2>
      <Box className="result__container">
        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
          <CircularProgress
            variant="determinate"
            color="success"
            className={
              answers.right.length === 0
                ? 'result__diagramm-error'
                : 'result__diagramm'
            }
            size={150}
            value={
              (answers.right.length /
                (answers.right.length + answers.errors.length)) *
              100
            }
            thickness={20}
          />
          <Box className="result__diagramm-text-container">
            <p className="result__diagramm-text">{`${answers.right.length}/${
              answers.right.length + answers.errors.length
            }`}</p>
          </Box>
        </Box>
        <Box className="result__button-container">
          <Button variant="contained" color="secondary" onClick={playAgain}>
            Play again
          </Button>
          <Button
            variant="contained"
            color="secondary"
            component={NavLink}
            to="/games"
          >
            To games list
          </Button>
        </Box>
      </Box>
      <Link
        color="secondary"
        className="result__show-more-btn"
        onClick={() => setShowMore(!showMore)}
      >
        {showMore ? (
          <>
            Show less <KeyboardArrowUpIcon />
          </>
        ) : (
          <>
            Show more <KeyboardArrowDownIcon />
          </>
        )}
      </Link>
      <Slide direction="up" in={showMore} mountOnEnter unmountOnExit>
        <Box className="result__table">
          <ResultList name="Right answers" arr={answers.right} />
          <ResultList name="Errors" arr={answers.errors} />
          <ResultList name="New words" arr={answers.new} />
        </Box>
      </Slide>
    </Box>
  );
};
