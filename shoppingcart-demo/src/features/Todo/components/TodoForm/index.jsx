import React from 'react';
import PropTypes from 'prop-types';
import InputField from '../../../../components/Form-controls/InputField';
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

  const form = useForm({
    defaultValues: {
      title: '',
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = (data, e) => {
    const { onSubmit } = props;
    if (onSubmit) {
      onSubmit(data);
    }
    e.target.reset();
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <InputField label="Todo" name="title" form={form} />
    </form>
  );
}

export default TodoForm;
