import { Button } from '@mui/material';
import { Word } from 'types/types';

type AnswerBtnType = {
  answer: {
    id: string;
    translate: string;
  };
  currentWord: Word;
  isAnswer: string | null;
  setIsAnswer: React.Dispatch<React.SetStateAction<string | null>>;
  rightAnswer: () => void;
  errorAnswer: () => void;
};

export default function AnswerBtnAudioCall({
  answer,
  currentWord,
  isAnswer,
  setIsAnswer,
  rightAnswer,
  errorAnswer,
}: AnswerBtnType): JSX.Element {


  const checkAnswer = (event: React.MouseEvent<HTMLButtonElement>) => {
    const btn = event.target as HTMLButtonElement;
    const btnName = btn.name;
    setIsAnswer(btnName);
    if (btnName === currentWord.id) {
      rightAnswer();
    } else {
      errorAnswer();
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
