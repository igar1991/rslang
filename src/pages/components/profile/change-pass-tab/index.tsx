import React, { FormEvent, useState } from 'react';
import { Button } from '@mui/material';

import { useAppSelector } from 'redux/hooks';
import { selectAuth } from 'redux/slices/authUserSlice';
import { authAPI } from 'api/authService';

import { MessageType } from 'pages/components/modal-message';
import TabPanel from '../tab-panel';
import FormInput, { ErrorsType, ValuesType } from '../../form-input';

type EditPassTabType = {
  tab: number;
  setMessage: React.Dispatch<React.SetStateAction<MessageType>>;
  setTab: React.Dispatch<React.SetStateAction<number>>;
};

const EDIT_PASS_INPUT = [
  { id: 'newPass', text: 'New password' },
  { id: 'confirmPass', text: 'Confirm new password' },
];

export default function EditPassTab({ tab, setMessage, setTab }: EditPassTabType): JSX.Element {
  const { id: userId } = useAppSelector(selectAuth);
  const [changeUser] = authAPI.useEditUserMutation();

  const [values, setValues] = useState<ValuesType>({ newPass: '', confirmPass: '' });
  const [errors, setErrors] = useState<ErrorsType>({
    newPass: { error: false, message: ' ' },
    confirmPass: { error: false, message: ' ' },
  });

  const onSubmitForm = async (ev: FormEvent) => {
    ev.preventDefault();
    if (errorsChecking()) {
      const newUser = await changeUser({ id: userId, body: { password: values.newPass } });
      if ('data' in newUser) {
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
      newPass: { error: false, message: ' ' },
      confirmPass: { error: false, message: ' ' },
    };

    if (!values.newPass) newErrors.newPass = { error: true, message: 'The field is empty' };
    if (!values.confirmPass) newErrors.confirmPass = { error: true, message: 'The field is empty' };
    if (!values.newPass || !values.confirmPass) textErrorMessage.push('Fill in all the fields');
    if (values.newPass.length < 8) {
      newErrors.newPass = { error: true, message: 'Password is shorter than 8 characters' };
      textErrorMessage.push('Password is shorter than 8 characters');
    }
    if (values.newPass && values.confirmPass && values.newPass !== values.confirmPass) {
      newErrors.confirmPass = { error: true, message: 'Passwords do not match' };
      textErrorMessage.push('Passwords do not match');
    }
    setErrors(newErrors);
    if (textErrorMessage.length > 0) setMessage({ show: true, text: textErrorMessage.join('. '), severity: 'error' });
    return Object.values(newErrors).every((err) => !err.error);
  };

  return (
    <TabPanel value={tab} index={2}>
      <form onSubmit={onSubmitForm}>
        {EDIT_PASS_INPUT.map((input) => (
          <FormInput
            key={input.id}
            input={input}
            values={values}
            setValues={setValues}
            errors={errors}
            setErrors={setErrors}
          />
        ))}
        <Button variant='contained' color='secondary' type='submit' className='edit-profile__button'>
          Save
        </Button>
      </form>
    </TabPanel>
  );
}
