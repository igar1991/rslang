import { Device } from '../../types/types';
import { useLayoutEffect, useState } from 'react';

export const useDevice = () => {
  const [width, setWidth] = useState(0);

  const updateWidth = () => {
    setWidth(window.innerWidth);
  };

  useLayoutEffect(() => {
    window.addEventListener('resize', updateWidth);

    updateWidth();

    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  if (width >= 900) {
    return Device.DESKTOP;
  }

  if (width >= 600) {
    return Device.TABLET;
  }

  return Device.MOBILE;
};
