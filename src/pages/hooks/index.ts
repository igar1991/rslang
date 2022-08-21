import { useMediaQuery } from '@mui/material';

export const useDevice = () => {
  const isTablet = useMediaQuery('(min-width:768px)');
  const isMobile = useMediaQuery('(max-width:376px)');

  if (isTablet) {
    return 'tablet';
  }

  if (isMobile) {
    return 'mobile';
  }

  return 'desktop';
};
