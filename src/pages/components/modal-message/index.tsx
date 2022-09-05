import React from 'react';
import { Alert, Snackbar } from '@mui/material';

export type MessageType = {
  show: boolean;
  text: string;
  severity: 'error' | 'success' | undefined;
};

type ModalMessageType = {
  message: MessageType;
  setMessage: React.Dispatch<React.SetStateAction<MessageType>>;
};

export default function ModalMessage({ message, setMessage }: ModalMessageType): JSX.Element {
  
  const onCloseError = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setMessage({ show: false, text: '', severity: message.severity });
  };

  return (
    <Snackbar open={message.show} autoHideDuration={4000} onClose={onCloseError}>
      <Alert onClose={onCloseError} severity={message.severity} variant='filled'>
        {message.text}
      </Alert>
    </Snackbar>
  );
}
