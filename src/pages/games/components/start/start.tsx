import { Typography } from '@mui/material';
import { WordsLevels } from 'pages/vocabulary/vocabulary-words/words-view/words-levels';

interface StartInterface {
  onClickHandler: (group: number)=>void;
  title: string;
  description: string;
}

export const Start =({onClickHandler, title, description }:StartInterface)=>{
  return (
    <>
      <>
        <Typography variant="h3" gutterBottom className='game__title'>
          {title}
        </Typography>
        <Typography
          sx={{ marginBottom: '50px' }}
          variant="h6"
          gutterBottom
          className='game__description'
        >
          {description}
        </Typography>
      </>
      <WordsLevels onClickHandler={onClickHandler} />
    </>
  );
};
