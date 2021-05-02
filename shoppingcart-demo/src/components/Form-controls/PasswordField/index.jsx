import { FormHelperText } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Controller } from 'react-hook-form';

PasswordField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  form: PropTypes.object.isRequired,
};

function PasswordField(props) {
  const { label, name, form } = props;

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword((x) => !x);
  };
  return (
    <FormControl error={form.formState.errors[name]} variant="outlined" margin="normal" fullWidth>
      <InputLabel htmlFor={name}>{label}</InputLabel>
      <Controller
        control={form.control}
        name={name}
        render={({ field: { onChange }, fieldState: { invalid, isTouched, isDirty, error } }) => (
          <OutlinedInput
            id={name}
            onChange={onChange}
            label={label}
            type={showPassword ? 'text' : 'password'}
            
            endAdornment={
              <InputAdornment position="end">
                <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} edge="end">
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            labelWidth={70}
          />
        )}
      />

      <FormHelperText error={form.formState.errors[name]}>{form.formState.errors[name]?.message}</FormHelperText>
    </FormControl>
  );
}

export default PasswordField;
