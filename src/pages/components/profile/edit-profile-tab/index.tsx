import React, { FormEvent, useState } from 'react';
import { Button } from '@mui/material';

import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { changeName, selectAuth } from 'redux/slices/authUserSlice';
import { authAPI } from 'api/authService';

import { MessageType } from 'pages/components/modal-message';
import TabPanel from '../tab-panel';
import FormInput, { ErrorsType, ValuesType } from '../../form-input';

type EditProfileTabType = {
  tab: number;
  setMessage: React.Dispatch<React.SetStateAction<MessageType>>;
  setTab: React.Dispatch<React.SetStateAction<number>>
};

export default function EditProfileTab({ tab, setMessage, setTab }: EditProfileTabType): JSX.Element {
  const dispatch = useAppDispatch();

  const { id: userId } = useAppSelector(selectAuth);
  const { data: user } = authAPI.useGetUserByIdQuery({ id: userId });
  const [changeUser] = authAPI.useEditUserMutation();

  const [values, setValues] = useState<ValuesType>({ email: '', name: '' });
  const [errors, setErrors] = useState<ErrorsType>({
    name: { error: false, message: ' ' },
    email: { error: false, message: ' ' },
  });

  const onSubmitForm = async (ev: FormEvent) => {
    ev.preventDefault();
    if (errorsChecking()) {
      const body = {
        name: values.name ? values.name : (user?.name as string),
        email: values.email ? values.email : (user?.email as string),
      };
      const newUser = await changeUser({ id: userId, body: body });
      if ('data' in newUser) {
        if (values.name) {
          localStorage.setItem('name', values.name);
          dispatch(changeName(values.name));
        }
        setMessage({ show: true, text: 'Save!', severity: 'success' });
        setValues({ email: '', name: '' });
        setTab(0);
      }
      if ('error' in newUser) {
        setMessage({ show: true, text: 'Something went wrong. Try again', severity: 'error' });
      }
    } 
  };

  const errorsChecking = () => {
    const textErrorMessage = [];
    const newErrors = {
      name: { error: false, message: ' ' },
      email: { error: false, message: ' ' },
    };
    const regexp = /^[\w\d%$:.-]+@\w+\.\w{2,5}$/;

    if (values.email && !regexp.test(values.email)) {
      newErrors.email = { error: true, message: 'Incorrect email' };
      textErrorMessage.push('Incorrect email');
    }
    if (!values.email && !values.name) {
      newErrors.name = { error: true, message: 'Enter a new name or/and email' };
      newErrors.email = { error: true, message: 'Enter a new name or/and email' };
      textErrorMessage.push('Enter a new name or/and email');
    }
    setErrors(newErrors);
    if (textErrorMessage.length > 0) setMessage({ show: true, text: textErrorMessage.join('. '), severity: 'error' });
    return Object.values(newErrors).every((err) => !err.error);
  };

  return (
    <TabPanel value={tab} index={1}>
      <form onSubmit={onSubmitForm}>
        <FormInput
          input={{ id: 'name', text: 'New name' }}
          values={values}
          setValues={setValues}
          errors={errors}
          setErrors={setErrors}
        />
        <p className='edit-profile__text'>or / and</p>
        <FormInput
          input={{ id: 'email', text: 'New e-mail' }}
          values={values}
          setValues={setValues}
          errors={errors}
          setErrors={setErrors}
        />
        <Button variant='contained' color='secondary' type='submit' className='edit-profile__button'>
          Save
        </Button>
      </form>
    </TabPanel>
  );
}
