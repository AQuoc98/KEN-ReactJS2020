import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core';
import { Controller } from 'react-hook-form';

InputField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  form: PropTypes.object.isRequired,
};

function InputField(props) {
  const { label, name, form } = props;

  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field: { onChange }, fieldState: { invalid, isTouched, isDirty, error } }) => (
        <TextField
          onChange={onChange}
          fullWidth
          label={label}
          helperText={error?.message}
          error={form.formState.errors[name]}
          variant="outlined"
          margin="normal"
        />
      )}
    />
  );
}

export default InputField;
