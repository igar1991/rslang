import { API_BASE_URL } from 'api/api';
import { UserWordData, Word } from 'types/types';
import { AUDIOCALL_ANSWERS } from '../constants';

export const audioStartHandler = (audioFile: string) => {
  const audioFiles = new Audio(`${[API_BASE_URL, audioFile].join('/')}`);
  audioFiles.play();
};

export const userWordGame = (usersWords: undefined | UserWordData[], wordId: string, answer: boolean) => {
  const word = usersWords ? usersWords.find((item) => item.wordId === wordId) : null;
  const newValue = {
    date: new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }),
    answer: answer,
  };
  if (word) {
    const optional = { ...word.optional };
    optional.games ? optional.games.push(newValue) : (optional.games = [newValue]);
    if (optional.games.slice(word.difficulty === 'hard' ? 5 : 3).every(item => item.answer === true)) {
      optional.learned = true;
      optional.date = new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
    }
    if (optional.learned && !answer) {
      optional.learned = false;
      delete optional.date;
    }
    const updateWord = { difficulty: word.difficulty, optional: { ...optional } };
    // [] = wordsAPI.useUpdateUserWordMutation({ id: word.id, wordId: wordId, body: updateWord });
    console.log(updateWord);  
  }

  // return { data: data, id: userId };
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
