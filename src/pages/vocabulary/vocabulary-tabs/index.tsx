import { Tab, Tabs } from '@mui/material';
import BookIcon from '@mui/icons-material/Book';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import { SyntheticEvent, useCallback, useEffect, useState } from 'react';
import { Device, VocabularyTab } from '../../../types/types';
import { useDispatch } from 'react-redux';
import { setSelectedTab } from '../../../redux/slices/wordsSlice';
import './vocabulary-tabs.css';
import { useDevice } from '../../hooks';

export const VocabularyTabs = () => {
  const [tab, setTab] = useState(0);
  const dispatch = useDispatch();
  const handleChange = useCallback((event: SyntheticEvent, newValue: number) => {
    setTab(newValue);
  }, [setTab]);
  const device = useDevice();

  useEffect(() => {
    dispatch(setSelectedTab(tab));
  }, [tab, dispatch]);

  return (
    <Tabs
      variant={device === Device.MOBILE ? 'fullWidth' : 'standard'}
      value={tab}
      textColor='secondary'
      indicatorColor='secondary'
      onChange={handleChange}
      aria-label='icon label tabs example'
    >
      <Tab
        iconPosition='end'
        value={VocabularyTab.VOCABULARY}
        icon={<BookIcon />}
        label={'Vocabulary'.toUpperCase()}
      />
      <Tab
        iconPosition='end'
        value={VocabularyTab.HARD_WORDS}
        icon={<FitnessCenterIcon />}
        label={'Hard words'.toUpperCase()}
      />
    </Tabs>
  );
};
