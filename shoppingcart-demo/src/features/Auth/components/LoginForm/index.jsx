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

LoginForm.propTypes = {
  onSubmit: PropTypes.func,
};

function LoginForm(props) {
  const classes = useStyles();

  const schema = yup.object().shape({
    identifier: yup.string().required('Vui lòng nhập email').email('Vui lòng nhập đúng định dạng email'),
    password: yup.string().required('Vui lòng nhập mật khẩu'),
  });

  const form = useForm({
    defaultValues: {
      identifier: '',
      password: '',
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
        Sign in
      </Typography>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <InputField name="identifier" label="Email" form={form} />
        <PasswordField name="password" label="Password" form={form} />
        <Button
          disabled={form.formState.isSubmitting}
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          className={classes.submit}
          size="large"
        >
          Sign in
        </Button>
      </form>
    </div>
  );
}

export default LoginForm;
