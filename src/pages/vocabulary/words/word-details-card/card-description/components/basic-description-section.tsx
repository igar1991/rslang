import { Box, Typography } from '@mui/material';
import { Device } from '../../../../../../types/types';

interface Props {
  device: string;
  title: string;
  original: string;
  translation: string;
}

export const BasicDescriptionSection = ({ device, title, original, translation }: Props) => {
  return (
    <Box className='details-card_description-section'>
      <Typography
        variant={device === Device.DESKTOP ? 'body1' : 'body2'}
        className='word-subtitle'
      >
        {title}
      </Typography>
      <Typography
        variant={device === Device.DESKTOP ? 'body1' : 'body2'}
        dangerouslySetInnerHTML={{ __html: original }}
      />
      <Typography
        variant={device === Device.DESKTOP ? 'body1' : 'body2'}
        dangerouslySetInnerHTML={{ __html: translation }}
      />
    </Box>
  );
};
