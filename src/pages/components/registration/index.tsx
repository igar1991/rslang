import React, { useState, FormEvent } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';

import { authAPI } from 'api/authService';
import FormInput, { ErrorsType, ValuesType } from '../form-input';
import { MessageType } from '../modal-message';

import './registration.css';
import { ACHIEVEMENTS } from 'pages/statistics/components/achievements/constants';
import { wordsAPI } from 'api/wordsService';
import { AchievementPopup } from 'pages/statistics/components/achievements/achievement-popup';

type InRegistrationType = {
  registerModal: boolean;
  closeRegisterModal: () => void;
  openAuthorizationModal: () => void;
  setMessage: React.Dispatch<React.SetStateAction<MessageType>>;
};

const REGISTER__INPUT = [
  { id: 'name', text: 'Name' },
  { id: 'email', text: 'E-mail' },
  { id: 'pass', text: 'Password' },
  { id: 'confirmPass', text: 'Confirm password' }
];

export default function Registration({
  registerModal,
  closeRegisterModal,
  openAuthorizationModal,
  setMessage
}: InRegistrationType): JSX.Element {
  const [createUser] = authAPI.useCreateUserMutation();
  const [loginUser] = authAPI.useLoginUserMutation();
  const [createStatistics] = wordsAPI.useUpdateUserStatisticsMutation();

  const [values, setValues] = useState<ValuesType>({ name: '', email: '', pass: '', confirmPass: '' });
  const [errors, setErrors] = useState<ErrorsType>({
    name: { error: false, message: ' ' },
    email: { error: false, message: ' ' },
    pass: { error: false, message: ' ' },
    confirmPass: { error: false, message: ' ' }
  });
  const [show, setShow] = useState(false);
  const [achievementImage, setAchievementImage] = useState('');
  const [achievementTitle, setAchievementTitle] = useState('');
  const [achievementDescription, setAchievementDescription] = useState('');

  const onSubmitForm = async (ev: FormEvent) => {
    ev.preventDefault();
    if (errorsChecking()) {
      const newUser = await createUser({ name: values.name, email: values.email, password: values.pass });

      if ('data' in newUser) {
        const authUser = await loginUser({ email: values.email, password: values.pass });
        if ('data' in authUser) {
          setMessage({ show: true, text: `Welcome ${authUser.data.name}!`, severity: 'success' });
          setValues({ name: '', email: '', pass: '', confirmPass: '' });
          closeRegisterModal();

          ACHIEVEMENTS[0].achieved = true;
          const achievementsObj = ACHIEVEMENTS.reduce((acc, achievement, index) => {
            return {
              ...acc,
              [`achievement${index + 1}`]: achievement
            };
          }, {});
          const newDate = new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
          createStatistics({
            id: newUser.data.id,
            body: { learnedWords: 0, optional: { achievements: achievementsObj, statToday: {date: newDate, sprint:{rightAnswers:0,errorAnswers:0,newWords:0,series:0}, audioCall: {rightAnswers:0,errorAnswers:0,newWords:0,series:0}}, newWords: 0 } }
          });

          setShow(true);
          setAchievementImage(ACHIEVEMENTS[0].img);
          setAchievementTitle(ACHIEVEMENTS[0].name);
          setAchievementDescription(ACHIEVEMENTS[0].description);
        }
      }

      if ('error' in newUser) {
        let errorText = 'Unknown error. Try again';
        if ('originalStatus' in newUser.error && newUser.error.originalStatus === 417) {
          setErrors({ ...errors, email: { error: true, message: 'User with this e-mail exists' } });
          errorText = 'User with this e-mail exists';
        } else if ('error' in newUser.error) errorText = newUser.error.error;
        else if ('message' in newUser.error) errorText = newUser.error.message as string;
        clearPass();
        setMessage({ show: true, text: errorText, severity: 'error' });
      }
    }
  };

  const errorsChecking = () => {
    const newErrors = { ...errors };
    const regexp = /^[\w\d%$:.-]+@\w+\.\w{2,5}$/;

    if (!regexp.test(values.email)) newErrors.email = { error: true, message: 'Incorrect email' };
    if (values.name.length < 3) newErrors.name = { error: true, message: 'Field Name is shorter than 3 characters' };
    if (values.pass.length < 8) newErrors.pass = {
      error: true,
      message: 'Field Password is shorter than 8 characters'
    };
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
    setErrors({
      name: { error: false, message: ' ' },
      email: { error: false, message: ' ' },
      pass: { error: false, message: ' ' },
      confirmPass: { error: false, message: ' ' }
    });
    closeRegisterModal();
  };

  const onSignInClick = () => {
    onModalClose();
    openAuthorizationModal();
  };

  const handleCloseDialog = () => {
    setShow(false);
  };

  return (
    <>
      <AchievementPopup
        show={show}
        handleCloseDialog={handleCloseDialog}
        title={achievementTitle}
        description={achievementDescription}
        image={achievementImage}
      />
      <Modal
        open={registerModal}
        onClose={onModalClose}
      >
        <Box className='modal'>
          <h3 className='modal__title'>Create your profile</h3>
          <form
            onSubmit={onSubmitForm}
            className='modal__form'
          >
            {REGISTER__INPUT.map((input) => (
              <FormInput
                key={input.id}
                input={input}
                values={values}
                setValues={setValues}
                errors={errors}
                setErrors={setErrors}
              />
            ))}
            <Button
              variant='contained'
              color='secondary'
              type='submit'
              className='modal__button'
            >
              Start learning
            </Button>
          </form>
          <p className='modal__text'>
            I have an account,{' '}
            <Link
              className='modal__link'
              onClick={onSignInClick}
            >
              Sign In
            </Link>
          </p>
        </Box>
      </Modal>
    </>
  );
}
