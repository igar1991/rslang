import { Box, IconButton } from '@mui/material';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import { StarPurple500Sharp } from '@mui/icons-material';
import { Colors } from '../../../words-levels/constants';

interface Props {
  isHardWord: boolean;
  isLearnedWord: boolean;
  color: Colors;
}

export const HardLearnedIconsGroup = ({ isHardWord, isLearnedWord, color }: Props) => {
  return (
    <Box className='words-icons-group'>
      {isHardWord &&
        <IconButton
          disableRipple
          size='small'
          className='hard-word-icon'
        >
          <FitnessCenterIcon />
        </IconButton>
      }
      {isLearnedWord &&
        <IconButton
          color={color}
          disableRipple
          size='small'
          className='hard-word-icon'
        >
          <StarPurple500Sharp />
        </IconButton>
      }
    </Box>
  );
};
