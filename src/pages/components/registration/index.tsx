import React, { useState, FormEvent } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';

import { authAPI } from '../../../api/authService';
import RegistrationInput from './registration-input';

import './registration.css';

type InRegistrationType = {
  registerModal: boolean;
  closeRegisterModal: () => void;
  setMessageModal: React.Dispatch<React.SetStateAction<{ open: boolean; text: string }>>;
};

export type ValuesType = {
  [key: string]: string;
};

export type ErrorsType = {
  [key: string]: { error: boolean; message: string };
};

const REGISTER__INPUT = [
  { id: 'name', text: 'Name' },
  { id: 'email', text: 'Email' },
  { id: 'pass', text: 'Password' },
  { id: 'confirmPass', text: 'Confirm password' },
];

export default function Registration({
  registerModal,
  closeRegisterModal,
  setMessageModal,
}: InRegistrationType): JSX.Element {
  const [createUser] = authAPI.useCreateUserMutation();
  const [loginUser] = authAPI.useLoginUserMutation();

  const [values, setValues] = useState<ValuesType>({ name: '', email: '', pass: '', confirmPass: '' });
  const [errors, setErrors] = useState<ErrorsType>({
    name: { error: false, message: ' ' },
    email: { error: false, message: ' ' },
    pass: { error: false, message: ' ' },
    confirmPass: { error: false, message: ' ' },
  });

  const onSubmitForm = async (ev: FormEvent) => {
    ev.preventDefault();
    if (errorsChecking()) {
      const newUser = await createUser({ name: values.name, email: values.email, password: values.pass });

      if ('data' in newUser) {
        const authUser = await loginUser({ email: values.email, password: values.pass });
        if ('data' in authUser) {
          setMessageModal({ open: true, text: `Welcome ${authUser.data.name}!` });
          setValues({ name: '', email: '', pass: '', confirmPass: '' });
          closeRegisterModal();
        }
        setTimeout(() => {
          setMessageModal({ open: false, text: '' });
        }, 2000);
      }

      if ('error' in newUser) {
        if ('originalStatus' in newUser.error && newUser.error.originalStatus === 417) {
          setErrors({ ...errors, email: { error: true, message: 'User with this e-mail exists' } });
          setMessageModal({ open: true, text: 'User with this e-mail exists' });
        } else if ('error' in newUser.error) setMessageModal({ open: true, text: `${newUser.error.error}!` });
        else if ('message' in newUser.error) setMessageModal({ open: true, text: `${newUser.error.message}!` });
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
    if (values.name.length < 3) newErrors.name = { error: true, message: 'Field Name is too short' };
    if (values.pass.length < 8) newErrors.pass = { error: true, message: 'Field Password is too short' };
    if (values.pass !== values.confirmPass) newErrors.confirmPass = { error: true, message: 'Password mismatch' };
    else newErrors.confirmPass = { error: false, message: ' ' };

    REGISTER__INPUT.map((input) => {
      if (!values[input.id]) newErrors[input.id] = { error: true, message: 'The field is empty' };
    });

    setErrors({ ...newErrors });
    return Object.values(newErrors).every((err) => !err.error);
  };

  const clearPass = () => {
    setValues({ ...values, pass: '', confirmPass: '' });
  };

  const onModalClose = () => {
    clearPass();
    closeRegisterModal();
  };

  return (
    <Modal open={registerModal} onClose={onModalClose}>
      <Box className='modal'>
        <h3 className='modal__title'>Create your profile</h3>
        <form onSubmit={onSubmitForm} className='modal__form'>
          {REGISTER__INPUT.map((input) => (
            <RegistrationInput
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
          I have an account, <Link className='modal__link'>Sign In</Link>
        </p>
      </Box>
    </Modal>
  );
}
