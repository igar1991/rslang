import { Button, Box } from '@mui/material';
import { useAppSelector } from 'redux/hooks';
import { wordsAPI } from 'api/wordsService';
import { selectAuth } from 'redux/slices/authUserSlice';
import { userWordGame } from 'pages/games/utils';
import { QuestionsType } from '..';
import 'pages/games/audiocall/audiocall.css';

type AnswerBtnType = {
  question: QuestionsType;
  rightAnswer: (isNew: boolean) => void;
  errorAnswer: (isNew: boolean) => void;
};

export default function LogInAnswerBtnSprint({
  question,
  rightAnswer,
  errorAnswer,
}: AnswerBtnType): JSX.Element {
  const { id: userId } = useAppSelector(selectAuth);
  const { data: userWords } = wordsAPI.useGetUserWordsQuery(userId);
  const [addUserWord] = wordsAPI.useAddUserWordMutation();
  const [updateUserWord] = wordsAPI.useUpdateUserWordMutation();

  const checkAnswer = (event: React.MouseEvent<HTMLButtonElement>) => {
    const btn = event.target as HTMLButtonElement;
    const btnName = btn.name;
    let currentAnswer: boolean;
    const userWord = userWords?.find((item) => item.wordId === question.word.id);

    if (btnName === question.answer) {
      rightAnswer(!userWord);
      currentAnswer = true;
    } else {
      errorAnswer(!userWord);
      currentAnswer = false;
    }

    if (userWord) {
      const body = userWordGame(userWord, currentAnswer);
      updateUserWord({ id: userId, wordId: question.word.id, body: body });
    } else {
      const body = {
        difficulty: 'easy',
        optional: {
          learned: false,
          games: {
            firstDate: new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }),
            answer: [currentAnswer],
          },
        },
      };
      addUserWord({ id: userId, wordId: question.word.id, body: body });
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
