import React, { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { TextField, Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useLocation, useNavigate } from "react-router-dom";

import axios from "axios";
import { verifyOTP } from "./../../services/api_service";
import CustomLoader from "../../components/customLoader";
import CustomSnackbar from "../../components/snackbar";


export default function VerifyOTP() {
  const location = useLocation();

  // eslint-disable-next-line no-unused-vars
  const [phone, setPhone] = useState(location.state || "Unknown Phone"); // Fallback if state is undefined
  const [otp, setOtp] = useState(["", "", "", ""]); // An array for 4 OTP fields

  // message
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "error",
  });

  const navigate = useNavigate();

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  // Handle input change
  const handleChange = (index, value) => {
    const updatedOtp = [...otp];
    updatedOtp[index] = value.slice(-1); // Keep only the last entered digit
    setOtp(updatedOtp);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    // Concatenate OTP into a single string
    const otpString = otp.join("");

    try {
      const response = await axios.post(verifyOTP, {
        phone, // Payload sent to the backend
        otp: otpString, // Send concatenated OTP string
      });
      if (response.data.status === "success") {
        setSnackbar({
          open: true,
          message: response.data.message,
          severity: "success",
        });
        navigate("/user-type", { state: phone });
      } else {
        setSnackbar({
          open: true,
          message: "Invalid OTP",
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

  return (
    <React.Fragment>
      <CssBaseline />
      <Container className="outer_content">
        <Box>
          <Typography className="header_headline" fontWeight={700} variant="p">
            OTP Verification
          </Typography>
        </Box>
        <Box>
          <Typography className="phn_num_otp_text" variant="p">
            Enter OTP code that sent to {phone}
          </Typography>
        </Box>
        <Box fontStyle={{ marginTop: "10px" }}>
          <form className="signInContent" onSubmit={handleSubmit}>
            <Box className="otp_section">
              {otp.map((digit, index) => (
                <TextField
                  className="otp_digit"
                  key={index}
                  value={otp[index]}
                  onChange={(e) => handleChange(index, e.target.value)}
                  inputProps={{
                    maxLength: 1, // Limit each input to 1 character
                    style: {
                      textAlign: "center",
                      fontFamily: "DM Serif Display, serif",
                    },
                  }}
                  variant="outlined"
                />
              ))}
            </Box>
            {loading && <CustomLoader />}
            <Box className="text-center mt10">
              <Typography
                className="have_an_account"
                variant="body2"
                gutterBottom
              >
                Didn&apos;t receive OTP code?
              </Typography>
              <Typography className="forgot_pass" variant="body2" gutterBottom>
                Resend OTP
              </Typography>
            </Box>
            <Button className="auth_btn w100" type="submit" variant="contained">
              {loading ? "Verify & processing..." : "Verify & Processed"}
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
    </React.Fragment>
  );
}
