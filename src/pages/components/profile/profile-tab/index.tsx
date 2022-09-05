import React from 'react';
import { Box, Button } from '@mui/material';
import { useAppSelector } from 'redux/hooks';
import { selectAuth } from 'redux/slices/authUserSlice';
import { authAPI } from 'api/authService';
import { useAppDispatch } from 'redux/hooks';
import { logout } from 'redux/slices/authUserSlice';

import TabPanel from '../tab-panel';

type ProfileTabType = {
  tab: number;
  onCloseModal: () => void;
};

export default function ProfileTab({ tab, onCloseModal }: ProfileTabType): JSX.Element {
  const dispatch = useAppDispatch();
  const { id: userId } = useAppSelector(selectAuth);
  const { data: user } = authAPI.useGetUserByIdQuery({ id: userId });
  const [deleteUser] = authAPI.useDeleteUserMutation();

  const onLogOut = () => {
    onCloseModal();
    dispatch(logout());
  };

  const onDeleteUser = () => {
    onCloseModal();
    deleteUser({ id: userId });
    dispatch(logout());
  };

  return (
    <TabPanel value={tab} index={0}>
      <p className='profile__text'>Name: {user?.name}</p>
      <p className='profile__text'>E-mail: {user?.email}</p>
      <Box className='profile__button-container'>
        <Button variant='outlined' color='secondary' type='submit' onClick={onLogOut}>
          Log Out
        </Button>
        <Button variant='contained' color='secondary' type='submit' onClick={onDeleteUser}>
          Delete profile
        </Button>
      </Box>
    </TabPanel>
  );
}
