/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { TextField, Button } from "@mui/material";
import PasswordField from "../../../components/password";

import axios from "axios";
import CustomLoader from "../../../components/customLoader";
import CustomSnackbar from "../../../components/snackbar";
import { passwordChangeConfirmURL } from "../../../services/api_service";

export default function ChangePassword() {
  const location = useLocation();
  const [counter, setCounter] = useState(180); // 180 seconds = 3 minutes
  const [phone, setPhone] = useState(location.state || "Unknown Phone");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const intervalIdRef = useRef(null);

  // snackbar messaging
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "error",
  });

  const navigate = useNavigate();

  // Counter
  useEffect(() => {
    if (!intervalIdRef.current) {
      intervalIdRef.current = setInterval(() => {
        setCounter((prevCounter) => {
          if (prevCounter <= 1) {
            clearInterval(intervalIdRef.current);
            return 0;
          }
          return prevCounter - 1;
        });
      }, 1000); // 1 second interval
    }

    return () => {
      clearInterval(intervalIdRef.current);
    };
  }, []);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  const handleChange = (index, value) => {
    const updatedOtp = [...otp];
    updatedOtp[index] = value.slice(-1);
    setOtp(updatedOtp);
  };

  const otpString = otp.join("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setSnackbar({
        open: true,
        message: "Passwords do not match. Please try again.",
        severity: "error",
      });
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(passwordChangeConfirmURL, {
        phone,
        otp: otpString,
        new_password: password,
      });
      if (response.data.status === "success") {
        setSnackbar({
          open: true,
          message: response.data.message,
          severity: "success",
        });
        navigate("/signin");
      } else {
        setSnackbar({
          open: true,
          message: response.data.message,
          severity: "error",
        });
      }
    } catch (err) {
      setSnackbar({
        open: true,
        message: err.response?.data?.message || "Something went wrong.",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <>
      <CssBaseline />
      <Container className="outer_content">
        <Box>
          <Typography className="header_headline" fontWeight={700} variant="p">
            Reset password
          </Typography>
        </Box>
        <Box>
          <Typography className="phn_num_otp_text" variant="p">
            Enter OTP code that was sent to {phone}
          </Typography>
        </Box>
        <Box className="signInContent" sx={{ marginTop: "10px" }}>
          <form onSubmit={handleSubmit}>
            <Box className="otp_section">
              {otp.map((digit, index) => (
                <TextField
                  key={index}
                  value={otp[index]}
                  onChange={(e) => handleChange(index, e.target.value)}
                  variant="outlined"
                />
              ))}
            </Box>
            <Box className="reset_pass_sec">
              <Typography className="reset_password_text" variant="body2">
                Resend Available: {formatTime(counter)}
              </Typography>
            </Box>
            <Box style={{ marginTop: "10px" }}>
              <PasswordField
                label="Password"
                onChange={(event) => setPassword(event.target.value)}
              />
            </Box>
            <Box style={{ marginTop: "10px" }}>
              <PasswordField
                label="Re-Enter Password"
                onChange={(event) => setConfirmPassword(event.target.value)}
              />
            </Box>
            {loading && <CustomLoader />}

            <Button
              type="submit"
              className="auth_btn w100"
              variant="contained"
              disabled={loading}
            >
              {loading ? "Resetting Password" : "Reset Password"}
            </Button>
          </form>
          <CustomSnackbar
            open={snackbar.open}
            message={snackbar.message}
            severity={snackbar.severity}
            onClose={handleSnackbarClose}
          />
        </Box>
      </Container>
    </>
  );
}
