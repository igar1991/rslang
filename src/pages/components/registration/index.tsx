import React, { useState, FormEvent, ChangeEvent } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import './registration.css';
import { fetchCreateUser } from '../../../api/authUser';

type InRegistrationType = {
  registerModal: boolean;
  closeRegisterModal: () => void;
};

type ValuesType = {
  [key: string]: string;
};

type HidePassType = {
  [key: string]: boolean;
};

type ErrorsType = {
  [key: string]: { error: boolean; message: string };
};

const REGISTER__INPUT = [
  { id: 'name', text: 'Name' },
  { id: 'email', text: 'Email' },
  { id: 'pass', text: 'Password' },
  { id: 'confirmPass', text: 'Confirm password' },
];

export default function Registration({ registerModal, closeRegisterModal }: InRegistrationType): JSX.Element {
  const [values, setValues] = useState<ValuesType>({ name: '', email: '', pass: '', confirmPass: '' });
  const [hidePass, setHidePass] = useState<HidePassType>({ pass: true, confirmPass: true });
  const [errors, setErrors] = useState<ErrorsType>({
    name: { error: false, message: ' ' },
    email: { error: false, message: ' ' },
    pass: { error: false, message: ' ' },
    confirmPass: { error: false, message: ' ' },
  });

  const onSubmitForm = async (ev: FormEvent) => {
    ev.preventDefault();

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

    if (Object.values(newErrors).every((err) => !err.error)) {
      const user = {
        name: values.name,
        email: values.email,
        password: values.pass,
      };
      const res = await fetchCreateUser(user);
      console.log(res);
    }

    setErrors({ ...newErrors });
  };

  const onInputChange = (ev: ChangeEvent) => {
    const input = ev.target as HTMLInputElement;
    setValues({ ...values, [input.id]: input.value });
  };

  return (
    <Modal open={registerModal} onClose={closeRegisterModal}>
      <Box className='modal'>
        <h3 className='modal__title'>Create your profile</h3>
        <form onSubmit={onSubmitForm} className='modal__form'>
          {REGISTER__INPUT.map((input) => (
            <FormControl key={input.id} className='modal__input' variant='outlined' color='secondary'>
              <InputLabel htmlFor={input.id} error={errors[input.id].error}>
                {input.text}
              </InputLabel>
              <OutlinedInput
                error={errors[input.id].error}
                id={input.id}
                type={hidePass[input.id] ? 'password' : 'text'}
                value={values[input.id]}
                onChange={onInputChange}
                onFocus={() => setErrors({ ...errors, [input.id]: { error: false, message: ' ' } })}
                endAdornment={
                  input.id === 'pass' || input.id === 'confirmPass' ? (
                    <InputAdornment position='end'>
                      <IconButton
                        onClick={() => setHidePass({ ...hidePass, [input.id]: !hidePass[input.id] })}
                        edge='end'
                      >
                        {hidePass[input.id] ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ) : (
                    ''
                  )
                }
                label={input.text}
              />
              <FormHelperText error={errors[input.id].error}>{errors[input.id].message}</FormHelperText>
            </FormControl>
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
