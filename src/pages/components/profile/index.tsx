import React, { useCallback, useState } from 'react';
import Modal from '@mui/material/Modal';
import { Box } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import ProfileTab from './profile-tab';
import EditProfileTab from './edit-profile-tab';
import EditPassTab from './change-pass-tab';
import { MessageType } from '../modal-message';

import './profile.css';

type ProfileModalType = {
  profileModal: boolean;
  setProfileModal: React.Dispatch<React.SetStateAction<boolean>>;
  setMessage: React.Dispatch<React.SetStateAction<MessageType>>;
};

export default function ProfileModal({ profileModal, setProfileModal, setMessage }: ProfileModalType): JSX.Element {
  const [tab, setTab] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  const onCloseModal = useCallback(() => {
    setTab(0);
    setProfileModal(false);
  }, [setProfileModal]);

  return (
    <Modal open={profileModal} onClose={onCloseModal}>
      <Box className='modal profile-modal'>
        <Tabs value={tab} onChange={handleChange} textColor='secondary' indicatorColor='secondary'>
          <Tab label='Profile' id='0' />
          <Tab label='Edit profile' id='1' />
          <Tab label='Сhange password' id='2' />
        </Tabs>
        <ProfileTab tab={tab} onCloseModal={onCloseModal} />
        <EditProfileTab tab={tab} setMessage={setMessage} setTab={setTab} />
        <EditPassTab tab={tab} setMessage={setMessage} setTab={setTab} />
      </Box>
    </Modal>
  );
}
