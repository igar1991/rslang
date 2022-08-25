import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import { Box } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import ProfileTab from './profile-tab';
import EditProfileTab from './edit-profile-tab';
import EditPassTab from './change-pass-tab';

import './profile.css';

type ProfileModalType = {
  profileModal: boolean;
  closeProfileModal: () => void;
};

export default function ProfileModal({ profileModal, closeProfileModal }: ProfileModalType): JSX.Element {
  const [tab, setTab] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  return (
    <Modal open={profileModal} onClose={closeProfileModal}>
      <Box className='modal profile-modal'>
        <Tabs
          value={tab}
          onChange={handleChange}
          textColor="secondary"
          indicatorColor="secondary"
        >
          <Tab label="Profile" id='0' />
          <Tab label="Edit profile" id='1' />
          <Tab label="Сhange password" id='2' />
        </Tabs>
        <ProfileTab tab={tab} closeProfileModal={closeProfileModal} />
        <EditProfileTab tab={tab} />
        <EditPassTab tab={tab} />
      </Box>
    </Modal>
  );
}
