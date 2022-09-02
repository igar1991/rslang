import { API_BASE_URL } from 'api/api';
import { UserWordData, Word } from 'types/types';
import { AUDIOCALL_ANSWERS } from '../constants';

export const audioStartHandler = (audioFile: string) => {
  const audioFiles = new Audio(`${[API_BASE_URL, audioFile].join('/')}`);
  audioFiles.play();
};

export const userWordGame = (userWord: UserWordData, answer: boolean) => {
  const date = new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });

  const trueAnswersLength = userWord.difficulty === 'hard' ? 5 : 3;
  const optional = { ...userWord.optional };

  optional.games && optional.games.answers ? optional.games = { firstDate: optional.games.firstDate, answers: [...optional.games.answers, answer] } : (optional.games = { firstDate: date, answers: [answer] });
  if (
    optional.games.answers.length >= trueAnswersLength &&
    optional.games.answers.slice(-trueAnswersLength).every((item) => item)
  ) {
    optional.learned = true;
    optional.date = date;
  }
  if (optional.learned && !answer) {
    optional.learned = false;
    delete optional.date;
  }
  return { difficulty: userWord.difficulty, optional: { ...optional } };
};

export const getArrayAudiocall = (data: Word[]) => {
  const array = data.map((item, index) => {
    const answersId = [index];
    do {
      const random = Math.floor(Math.random() * 20);
      if (!answersId.includes(random)) answersId.push(random);
    } while (answersId.length < AUDIOCALL_ANSWERS);
    const answers = answersId.map((item) => {
      return { id: data[item].id, translate: data[item].wordTranslate };
    });

    answers.sort(() => Math.random() - 0.5);

    return { word: item, answers: answers };
  });
  array.sort(() => Math.random() - 0.5);

  return array;
};

export const getArraySprint = (data: Word[]) => {
  const array = data.map((item, index) => {
    const random = Math.floor(Math.random() * 2);
    if (random === 0) {
      return { word: item, answer: 'true', translate: item.wordTranslate };
    } else {
      let randomAnswer: number;
      do {
        randomAnswer = Math.floor(Math.random() * 20);
      } while (randomAnswer === index);
      return { word: item, answer: 'false', translate: data[randomAnswer].wordTranslate };
    }
  });
  array.sort(() => Math.random() - 0.5);

  return array;
};

export const newLocalStatistic = (
  game: string,
  series: number,
  answers: { right: Word[]; errors: Word[]; new: Word[] }
) => {
  const statistic = {
    date: new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }),
    [game]: {
      rightAnswers: answers.right.length,
      errorAnswers: answers.errors.length,
      newWords: answers.new.length,
      series: series,
    },
  };
  localStorage.setItem('localStatistic', JSON.stringify(statistic));
};
