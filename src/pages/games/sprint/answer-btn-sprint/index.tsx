import { Button, Box } from '@mui/material';
import { QuestionsType } from '..';

type AnswerBtnType = {
  question: QuestionsType;
  rightAnswer: () => void;
  errorAnswer: () => void;
};

export default function AnswerBtnSprint({ question, rightAnswer, errorAnswer }: AnswerBtnType): JSX.Element {
  const checkAnswer = (event: React.MouseEvent<HTMLButtonElement>) => {
    const btn = event.target as HTMLButtonElement;
    const btnName = btn.name;
    if (btnName === question.answer) {
      rightAnswer();
    } else {
      errorAnswer();
    }
  };

  return (
    <Box className='sprint__buttons'>
      <Button variant='contained' className='sprint__btn' color='error' name='false' onClick={checkAnswer}>
        False
      </Button>
      <Button variant='contained' className='sprint__btn' color='success' name='true' onClick={checkAnswer}>
        True
      </Button>
    </Box>
  );
}
