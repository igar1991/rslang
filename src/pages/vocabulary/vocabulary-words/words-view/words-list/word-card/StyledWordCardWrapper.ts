import { styled } from '@mui/material';
import { Colors } from '../../words-levels/constants';

interface StyledWordCardWrapperProps {
  color: Colors;
  isActive: boolean;
}

export const StyledWordCardWrapper = styled('div')<StyledWordCardWrapperProps>(
  ({ theme, color, isActive }) => ({
    '&:hover': {
      backgroundColor: theme.palette[color].main,
      transition: 'background-color 0.5s ease'
    },
    backgroundColor: isActive ? theme.palette[color].light : 'white',
    transition: 'background-color 0.5s ease'
  })
);
