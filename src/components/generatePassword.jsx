import React, { useState } from "react";
import {
  IconButton,
  InputAdornment,
  FormControl,
  OutlinedInput,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

// eslint-disable-next-line react/prop-types
const GeneratePasswordField = ({ value, onChange, placeholder = "Password" }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <FormControl variant="outlined" fullWidth>
      <OutlinedInput
        id="password"
        className="custom_password_field"
        type={showPassword ? "text" : "password"}
        value={value} // 🔥 Use external value
        onChange={onChange} // 🔥 Controlled input
        placeholder={placeholder}
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

export default GeneratePasswordField;