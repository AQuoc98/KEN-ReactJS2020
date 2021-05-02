import { yupResolver } from '@hookform/resolvers/yup';
import { Avatar, Button, LinearProgress, makeStyles, Typography } from '@material-ui/core';
import { LockOutlined } from '@material-ui/icons';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import InputField from '../../../../components/Form-controls/InputField';
import PasswordField from '../../../../components/Form-controls/PasswordField';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    paddingTop: theme.spacing(4),
  },
  avatar: {
    margin: '0 auto',
    backgroundColor: theme.palette.secondary.main,
  },
  title: {
    margin: theme.spacing(2, 0, 3, 0),
    textAlign: 'center',
  },
  submit: {
    margin: theme.spacing(3, 0, 2, 0),
  },

  progress: {
    position: 'absolute',
    top: theme.spacing(1),
    left: 0,
    right: 0,
  },
}));

RegisterForm.propTypes = {
  onSubmit: PropTypes.func,
};

function RegisterForm(props) {
  const classes = useStyles();

  const schema = yup.object().shape({
    fullName: yup
      .string()
      .required('Vui lòng nhập tên')
      .test('Nhập ít nhất 2 ký tự trở lên', 'Vui lòng nhập ít nhất 2 ký tự trở lên', (value) => {
        return value.split(' ').length >= 2;
      }),
    email: yup.string().required('Vui lòng nhập email').email('Vui lòng nhập đúng định dạng email'),
    password: yup.string().required('Vui lòng nhập mật khẩu').min(6, 'Vui lòng nhập ít nhất 6 ký tự'),
    retypePassword: yup
      .string()
      .required('Vui lòng nhập xác nhận mật khẩu')
      .oneOf([yup.ref('password')], 'Mật khẩu xác thực không giống'),
  });

  const form = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      retypePassword: '',
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data, e) => {
    const { onSubmit } = props;

    if (onSubmit) {
      await onSubmit(data);
    }
  };

  return (
    <div className={classes.root}>
      {form.formState.isSubmitting && <LinearProgress className={classes.progress} />}
      <Avatar className={classes.avatar}>
        <LockOutlined></LockOutlined>
      </Avatar>
      <Typography component="h3" variant="h5" className={classes.title}>
        Create An Account
      </Typography>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <InputField name="fullName" label="Full name" form={form} />
        <InputField name="email" label="Email" form={form} />
        <PasswordField name="password" label="Password" form={form} />
        <PasswordField name="retypePassword" label="Retype Password" form={form} />
        <Button
          disabled={form.formState.isSubmitting}
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          className={classes.submit}
          size="large"
        >
          Create an account
        </Button>
      </form>
    </div>
  );
}

export default RegisterForm;
