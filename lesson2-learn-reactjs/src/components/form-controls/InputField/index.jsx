import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core';
import { Controller } from 'react-hook-form';

InputField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
};

function InputField(props) {
  const { form, name, label } = props;

  return (
    <Controller
      control={form.control}
      name={name}
      label={label}
      as={TextField}
      fullWidth
      error={!!form.errors[name]}
      helperText={form.errors[name]?.message}
      variant="outlined"
      margin="normal"
    />
  );
}

export default InputField;
