import { Device } from '../../types/types';
import { useLayoutEffect, useState } from 'react';
import { useAppSelector } from '../../redux/hooks';
import { Colors, ColorsByGroupMap } from '../vocabulary/vocabulary-words/words-view/words-levels/constants';
import { GROUPS } from '../vocabulary/vocabulary-words/constants';

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

export const useGroupColor = () => {
  const selectedGroup = useAppSelector((state) => state.words.group);

  return ColorsByGroupMap.get(GROUPS[selectedGroup]) as Colors;
};
