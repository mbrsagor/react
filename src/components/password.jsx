import React, { useState } from "react";
import {
  IconButton,
  InputAdornment,
  FormControl,
  OutlinedInput,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

// eslint-disable-next-line react/prop-types
const PasswordField = ({ onChange, placeholder = "Password" }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    if (onChange) {
      onChange(event);
    }
  };

  return (
    <FormControl variant="outlined" fullWidth>
      <OutlinedInput
        id="password"
        className="custom_password_field"
        type={showPassword ? "text" : "password"}
        value={password}
        onChange={handlePasswordChange}
        placeholder={placeholder} // Placeholder instead of label
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              onClick={handleTogglePasswordVisibility}
              edge="end"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  );
};

export default PasswordField;
