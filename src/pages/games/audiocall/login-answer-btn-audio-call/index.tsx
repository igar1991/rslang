import { Button } from '@mui/material';
import { useAppSelector } from 'redux/hooks';
import { wordsAPI } from 'api/wordsService';
import { Word } from 'types/types';
import { selectAuth } from 'redux/slices/authUserSlice';
import { userWordGame } from 'pages/games/utils';

type AnswerBtnType = {
  answer: {
    id: string;
    translate: string;
  };
  currentWord: Word;
  isAnswer: string | null;
  setIsAnswer: React.Dispatch<React.SetStateAction<string | null>>;
  rightAnswer: (isNew: boolean) => void;
  errorAnswer: (isNew: boolean) => void;
};

export default function LogInAnswerBtnAudioCall({
  answer,
  currentWord,
  isAnswer,
  setIsAnswer,
  rightAnswer,
  errorAnswer
}: AnswerBtnType): JSX.Element {
  const { id: userId } = useAppSelector(selectAuth);
  const { data: userWords } = wordsAPI.useGetUserWordsQuery(userId);
  const [addUserWord] = wordsAPI.useAddUserWordMutation();
  const [updateUserWord] = wordsAPI.useUpdateUserWordMutation();

  const checkAnswer = (event: React.MouseEvent<HTMLButtonElement>) => {
    const btn = event.target as HTMLButtonElement;
    const btnName = btn.name;
    let currentAnswer: boolean;
    const userWord = userWords?.find(item => item.wordId === currentWord.id);

    setIsAnswer(btnName);
    if (btnName === currentWord.id) {
      rightAnswer(!userWord);
      currentAnswer = true;
    } else {
      errorAnswer(!userWord);
      currentAnswer = false;
    }

    if (userWord) {
      const body = userWordGame(userWord, currentAnswer);
      updateUserWord({ id: userId, wordId: currentWord.id, body: body });
    } else {
      const body = {
        difficulty: 'easy',
        optional: {
          learned: false,
          games: {
            firstDate: new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }),
            answer: [currentAnswer]
          }
        }
      };
      addUserWord({ id: userId, wordId: currentWord.id, body: body });
    }
  };

  const chooseClass = (id: string) => {
    if (isAnswer === null) return 'audiocall__answer-btn';
    if (id === currentWord.id) return 'audiocall__answer-btn right-btn';
    if (isAnswer === id) return 'audiocall__answer-btn error-btn';
    return 'audiocall__answer-btn';
  };

  return (
    <Button
      key={answer.id}
      name={answer.id}
      variant='outlined'
      disabled={!!isAnswer}
      color='secondary'
      onClick={checkAnswer}
      sx={{ margin: '5px' }}
      className={chooseClass(answer.id)}
    >
      {answer.translate}
    </Button>
  );
}
