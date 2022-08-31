import { Box } from '@mui/material';
import { Title } from './components/title';
import './card-description.css';
import { Meaning } from './components/meaning';
import { Example } from './components/example';
import { Word } from 'types/types';
import { useDevice } from 'pages/hooks';

interface Props {
  selectedWord: Word;
}

export const DetailsCardDescription = ({ selectedWord }: Props) => {
  const {
    word,
    transcription,
    textMeaningTranslate,
    textMeaning,
    textExample,
    textExampleTranslate,
    audio,
    audioExample,
    audioMeaning
  } = selectedWord;

  const device = useDevice();

  return (
    <Box className='word__details-card_description'>
      <Title
        device={device}
        title={word}
        transcription={transcription}
        audio={[audio, audioMeaning, audioExample]}
      />
      <Meaning
        device={device}
        textMeaning={textMeaning}
        textMeaningTranslate={textMeaningTranslate}
      />
      <Example
        device={device}
        textExample={textExample}
        textExampleTranslate={textExampleTranslate}
      />
    </Box>
  );
};
