import React, { useState } from 'react';
import { Button } from '@mui/material';

// import { useAppSelector } from '../../../../redux/hooks';
// import { selectAuth } from '../../../../redux/slices/authUserSlice';
// import { authAPI, CreateUser } from '../../../../api/authService';

import TabPanel from '../tab-panel';
import FormInput, { ErrorsType, ValuesType } from '../../form-input';

// import './modal-message.css';

type EditPassTabType = {
  tab: number;
};

const EDIT_PASS__INPUT = [
  { id: 'pass', text: 'Password' },
  { id: 'newPass', text: 'New password' },
  { id: 'confirmPass', text: 'Confirm new password' },
];

export default function EditPassTab({ tab }: EditPassTabType): JSX.Element {
  // const user = useAppSelector(selectAuth);
  // const {data} = authAPI.useGetUserByIdQuery({ id: user.id }) as unknown as {data: CreateUser};
  const [values, setValues] = useState<ValuesType>({ pass: '', newPass: '',  confirmPass: ''});
  const [errors, setErrors] = useState<ErrorsType>({
    pass: { error: false, message: ' ' },
    newPass: { error: false, message: ' ' },
    confirmPass: { error: false, message: ' ' },
  });


  return (
    <TabPanel value={tab} index={2}>
      <form >
        {EDIT_PASS__INPUT.map(input => (
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
