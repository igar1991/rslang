import { Box, IconButton, Typography } from '@mui/material';
import { VolumeUp } from '@mui/icons-material';
import '../card-description.css';
import { API_BASE_URL } from '../../../../../../api/api';
import { Device } from '../../../../../../types/types';
import { useGroupColor } from '../../../../../hooks';

interface Props {
  device: string;
  title: string;
  transcription: string;
  audio: string[];
}

const playAudio = (audio: HTMLAudioElement) => () => {
  audio.play();
};

export const Title = ({ device, title, transcription, audio }: Props) => {
  const color = useGroupColor();
  const audioFiles = audio.map((audioFile) => new Audio(`${[API_BASE_URL, audioFile].join('/')}`));
  const [audioWord, audioMeaning, audioExample] = audioFiles;

  const audioStartHandler = () => {
    audioWord.play();
    audioWord.addEventListener('ended', playAudio(audioMeaning));
    audioMeaning.addEventListener('ended', playAudio(audioExample));
  };

  return (
    <Box className='details-card_description-title'>
      <Typography
        variant={device === Device.DESKTOP ? 'h5' : 'h6'}
        className='word-title'
      >
        {title}
      </Typography>
      <Typography
        variant={device === Device.DESKTOP ? 'h5' : 'h6'}
        className='word-transcription'
      >
        {transcription}
      </Typography>
      <IconButton
        color={color}
        aria-label='listen word pronunciation'
        onClick={audioStartHandler}
      >
        <VolumeUp />
      </IconButton>
    </Box>
  );
};
