import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

import './modal-message.css';

type ModalMessageType = {
  messageModal: { open: boolean; text: string };
  setMessageModal: React.Dispatch<React.SetStateAction<{ open: boolean; text: string }>>;
};

export default function ModalMessage({ messageModal, setMessageModal }: ModalMessageType): JSX.Element {
  const onClose = () => {
    setMessageModal({ open: false, text: '' });
  };

  return (
    <Modal open={messageModal.open} onClose={onClose}>
      <Box className='modal modal-message'>
        <p className='modal-message__text'>{messageModal.text}</p>
      </Box>
    </Modal>
  );
}
