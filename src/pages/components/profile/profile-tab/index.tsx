import React from 'react';
import { Button } from '@mui/material';
import { useAppSelector } from '../../../../redux/hooks';
import { selectAuth } from '../../../../redux/slices/authUserSlice';
// import { authAPI, CreateUser } from '../../../../api/authService';
import { useAppDispatch } from '../../../../redux/hooks';
import { logout } from '../../../../redux/slices/authUserSlice';

import TabPanel from '../tab-panel';


type ProfileTabType = {
  tab: number;
  closeProfileModal: () => void;
};

export default function ProfileTab({ tab, closeProfileModal }: ProfileTabType): JSX.Element {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectAuth);
  // const {data} = authAPI.useGetUserByIdQuery({ id: user.id }) as unknown as {data: CreateUser};

  const onLogOut = () => {
    closeProfileModal();
    dispatch(logout());
  };

  return (
    <TabPanel value={tab} index={0}>
      <p>Name: {user.name}</p>
      <p>E-mail: </p>
      <Button variant='contained' color='secondary' type='submit' className='modal__button' onClick={onLogOut}>Log Out</Button>
      <Button variant='outlined' color='secondary' type='submit' className='modal__button'>Delete profile</Button>
    </TabPanel>
  );
}
