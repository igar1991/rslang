import React, { useState } from 'react';
import { Button } from '@mui/material';

// import { useAppSelector } from '../../../../redux/hooks';
// import { selectAuth } from '../../../../redux/slices/authUserSlice';
// import { authAPI, CreateUser } from '../../../../api/authService';

import TabPanel from '../tab-panel';
import FormInput, { ErrorsType, ValuesType } from '../../form-input';

type EditProfileTabType = {
  tab: number;
};

const EDIT_PROFILE__INPUT = [
  { id: 'name', text: 'Name' },
  { id: 'email', text: 'E-mail' },
  { id: 'pass', text: 'Password' },
];

export default function EditProfileTab({ tab }: EditProfileTabType): JSX.Element {
  // const user = useAppSelector(selectAuth);
  // const {data} = authAPI.useGetUserByIdQuery({ id: user.id }) as unknown as {data: CreateUser};

  const [values, setValues] = useState<ValuesType>({ email: '', name: '', pass: '' });
  const [errors, setErrors] = useState<ErrorsType>({
    name: { error: false, message: ' ' },
    email: { error: false, message: ' ' },
    pass: { error: false, message: ' ' },
  });


  return (
    <TabPanel value={tab} index={1}>
      <form >
        {EDIT_PROFILE__INPUT.map(input => (
          <FormInput
            key={input.id}
            input={input}
            values={values}
            setValues={setValues}
            errors={errors}
            setErrors={setErrors}
          />
        ))}
        <Button variant='contained' color='secondary' type='submit' className='modal__button'>Save</Button>
      </form>
    </TabPanel>
  );
}
