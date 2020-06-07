import React, { useState } from 'react';
import { Input } from '@tecsinapse/ui-kit';
import InputAdornment from '@material-ui/core/InputAdornment';
import Lock from '@material-ui/icons/Lock';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const style = { width: '100%', backgroundColor: '#fff' };
export const InputPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <Input
      name="login_senha"
      label="Senha"
      style={style}
      type={showPassword ? 'text' : 'password'}
      margin="none"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Lock />
          </InputAdornment>
        ),
        endAdornment: (
          <IconButton
            aria-label="Toggle password visibility"
            onClick={() => setShowPassword(showPasswordOld => !showPasswordOld)}
          >
            {showPassword ? <Visibility /> : <VisibilityOff />}
          </IconButton>
        ),
      }}
    />
  );
};
