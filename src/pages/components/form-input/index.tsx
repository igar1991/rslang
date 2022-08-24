import React, { useState, ChangeEvent } from 'react';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import './form-input.css';

type InInputType = {
  input: { id: string; text: string };
  values: ValuesType;
  setValues: React.Dispatch<React.SetStateAction<ValuesType>>;
  errors: ErrorsType;
  setErrors: React.Dispatch<React.SetStateAction<ErrorsType>>;
};

export type ValuesType = {
  [key: string]: string;
};

export type ErrorsType = {
  [key: string]: { error: boolean; message: string };
};

export default function FormInput({ input, values, setValues, errors, setErrors }: InInputType): JSX.Element {
  const [hidePass, setHidePass] = useState(true);

  const onInputChange = (ev: ChangeEvent) => {
    const input = ev.target as HTMLInputElement;
    setValues({ ...values, [input.id]: input.value });
  };

  const onInputFocus = () => {
    setErrors({ ...errors, [input.id]: { error: false, message: ' ' } });
  };

  const onHidePassBtnClick = () => {
    setHidePass(!hidePass);
  };

  return (
    <FormControl key={input.id} className='modal__input' variant='outlined' color='secondary' size='small'>
      <InputLabel htmlFor={input.id} error={errors[input.id].error}>
        {input.text}
      </InputLabel>
      <OutlinedInput
        error={errors[input.id].error}
        id={input.id}
        type={(input.id === 'pass' || input.id === 'confirmPass') && hidePass ? 'password' : 'text'}
        value={values[input.id]}
        onChange={onInputChange}
        onFocus={onInputFocus}
        endAdornment={
          input.id === 'pass' || input.id === 'confirmPass' ? (
            <InputAdornment position='end'>
              <IconButton onClick={onHidePassBtnClick} edge='end'>
                {hidePass ? <VisibilityOff /> : <Visibility />}
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
  );
}
