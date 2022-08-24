import React, { useState, FormEvent } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';

import { authAPI } from '../../../api/authService';
import FormInput, { ErrorsType, ValuesType } from '../form-input';

type InRegistrationType = {
  authorizationModal: boolean;
  closeAuthorizationModal: () => void;
  openRegisterModal: () => void;
  setMessageModal: React.Dispatch<React.SetStateAction<{ open: boolean; text: string }>>;
};

const AUTORIZATION__INPUT = [
  { id: 'email', text: 'Email' },
  { id: 'pass', text: 'Password' },
];

export default function Authorization({
  authorizationModal,
  closeAuthorizationModal,
  openRegisterModal,
  setMessageModal,
}: InRegistrationType): JSX.Element {
  const [loginUser] = authAPI.useLoginUserMutation();

  const [values, setValues] = useState<ValuesType>({ email: '', pass: '' });
  const [errors, setErrors] = useState<ErrorsType>({
    email: { error: false, message: ' ' },
    pass: { error: false, message: ' ' },
  });

  const onSubmitForm = async (ev: FormEvent) => {
    ev.preventDefault();
    if (errorsChecking()) {
      const authUser = await loginUser({ email: values.email, password: values.pass });
      if ('data' in authUser) {
        setMessageModal({ open: true, text: `Welcome ${authUser.data.name}!` });
        setValues({ email: '', pass: '' });
        closeAuthorizationModal();
        setTimeout(() => {
          setMessageModal({ open: false, text: '' });
        }, 2000);
      }
      if ('error' in authUser) {
        console.log(authUser.error);
        if ('originalStatus' in authUser.error && authUser.error.originalStatus === 404) {
          setErrors({ ...errors, email: { error: true, message: 'User with this email was not found' } });
          setMessageModal({ open: true, text: 'User with this email was not found' });
        } else if ('originalStatus' in authUser.error && authUser.error.originalStatus === 403) {
          setErrors({ ...errors, pass: { error: true, message: 'Invalid password' } });
          setMessageModal({ open: true, text: 'Invalid password' });
        } else if ('error' in authUser.error) setMessageModal({ open: true, text: `${authUser.error.error}!` });
        else if ('message' in authUser.error) setMessageModal({ open: true, text: `${authUser.error.message}!` });
        else setMessageModal({ open: true, text: 'Unknown error. Try again' });
        clearPass();
        setTimeout(() => {
          setMessageModal({ open: false, text: '' });
        }, 3000);
      }
    }
  };

  const errorsChecking = () => {
    const newErrors = { ...errors };
    const regexp = /^[\w\d%$:.-]+@\w+\.\w{2,5}$/;

    if (!regexp.test(values.email)) newErrors.email = { error: true, message: 'Incorrect email' };
    AUTORIZATION__INPUT.map((input) => {
      if (!values[input.id]) newErrors[input.id] = { error: true, message: 'The field is empty' };
    });

    setErrors({ ...newErrors });
    return Object.values(newErrors).every((err) => !err.error);
  };

  const clearPass = () => {
    setValues({ ...values, pass: '' });
  };

  const onModalClose = () => {
    clearPass();
    setErrors({
      email: { error: false, message: ' ' },
      pass: { error: false, message: ' ' },
    });
    closeAuthorizationModal();
  };

  const onSignUpClick = () => {
    onModalClose();
    openRegisterModal();
  };

  return (
    <Modal open={authorizationModal} onClose={onModalClose}>
      <Box className='modal'>
        <h3 className='modal__title'>Sign In</h3>
        <form onSubmit={onSubmitForm} className='modal__form'>
          {AUTORIZATION__INPUT.map((input) => (
            <FormInput
              key={input.id}
              input={input}
              values={values}
              setValues={setValues}
              errors={errors}
              setErrors={setErrors}
            />
          ))}
          <Button variant='contained' color='secondary' type='submit' className='modal__button'>
            Start learning
          </Button>
        </form>
        <p className='modal__text'>
          I don’t have an account, <Link className='modal__link' onClick={onSignUpClick}>Sign Up</Link>
        </p>
      </Box>
    </Modal>
  );
}
