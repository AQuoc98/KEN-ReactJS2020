import { unwrapResult } from '@reduxjs/toolkit';
import { useSnackbar } from 'notistack';
import React from 'react';
import { useDispatch } from 'react-redux';
import { register } from '../../userSlice';
import RegisterForm from '../RegisterForm';
import PropTypes from 'prop-types';

Register.propTypes = {
  closeDialog: PropTypes.func,
};

function Register(props) {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (data) => {
    try {
      // auto set username = email
      data.username = data.email;
      const action = register(data);
      const resultAction = await dispatch(action);
      const user = unwrapResult(resultAction);
      // Close dialog
      const { closeDialog } = props;
      if (closeDialog) {
        closeDialog();
      }
      // Show notification

      enqueueSnackbar('Đăng kí thành công', { variant: 'success' });
    } catch (error) {
      console.log(error);
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  };
  return (
    <div>
      <RegisterForm onSubmit={handleSubmit} />
    </div>
  );
}

export default Register;
