import React from 'react';
import PropTypes from 'prop-types';
import InputField from '../../../../components/form-controls/InputField';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

TodoForm.propTypes = {
  onSubmit: PropTypes.func,
};

function TodoForm(props) {
  const schema = yup.object().shape({
    title: yup.string().required('Please enter title').min(5, 'Title is too short'),
  });

  const register = useForm({
    defaultValues: {
      title: '',
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = (values) => {
    const { onSubmit } = props;
    if (onSubmit) {
      onSubmit(values);
    }
    register.reset();
  };

  return (
    <form onSubmit={register.handleSubmit(onSubmit)}>
      <InputField name="title" label="Title Todo" form={register} />
    </form>
  );
}

export default TodoForm;
