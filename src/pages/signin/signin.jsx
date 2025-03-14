import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import PasswordField from "../../components/password";
import PhoneNumber from "../../components/phoneNumber";
import Avatar from "@mui/joy/Avatar";

import axios from "axios";
import logo from "../../assets/logo/logo.png";
import ForgotPasswordModal from './forgot_password/forgotPassword';
import { loginURL } from "./../../services/api_service";
import CustomLoader from "../../components/customLoader";
import CustomSnackbar from "../../components/snackbar";

export default function SignIn() {
  const [modalOpen, setModalOpen] = useState(false);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(loginURL, {
        username: phone,
        password: password,
        device_token: "",
      });
      if (response.data.status === "success") {
        // Save token and user details to localStorage
        const { token, ...userData } = response.data;
        localStorage.setItem("token", token); // Save token
        localStorage.setItem("user", JSON.stringify(userData)); // Save user details
        // Check user role and redirect to appropriate home page
        if (userData.role === 3) {
          navigate("/home");
        } else if (userData.role === 4) {
          navigate("/sponsor-home");
        }else if (userData.role === 5) {
          navigate("/guard-home");
        } else {
          setSnackbar({
            open: true,
            message: "Invalid user role. Please contact with the admin.",
            severity: "error",
          });
        }
        setSnackbar({
          open: true,
          message: response.data.message,
          severity: "success",
        });
      } else {
        setSnackbar({
          open: true,
          message: "Invalid credentials. Please try again.",
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

  const handleClick = () => {
    navigate("/sent-otp");
  };

  return (
    <>
      <CssBaseline />
      <Container className="outer_content">
        <Box>
          <Avatar
            size="lg"
            src={logo}
            variant="plain"
            sx={{
              width: 80, // Custom width
              height: 80, // Custom height
            }}
          />
          <Typography className="header_headline" variant="h5">
            E-PASS
          </Typography>
          <Typography className="title_sign_in" variant="body1">
            Sign In Here
          </Typography>
        </Box>
        <Box className="signInContent" sx={{ marginTop: "10px" }}>
          <form onSubmit={handleSubmit}>
            <Box>
              <PhoneNumber
                value={phone}
                onChange={(newPhone) => setPhone(newPhone)} // Correct onChange usage
              />
            </Box>
            <Box className="mt10">
              <PasswordField
                onChange={(event) => setPassword(event.target.value)}
              />
            </Box>
            {loading && <CustomLoader />}
            <Box className="mt10">
              <Typography
                className="forgot_pass"
                variant="body2"
                onClick={() => setModalOpen(true)} // Open the modal
              >
                Forgot Password!
              </Typography>
            </Box>
            <Button
              type="submit"
              className="auth_btn w100"
              variant="contained"
              disabled={loading}
            >
              {loading ? "Signing In..." : "Sign In"}
            </Button>
            <Box className="signInBottomSec">
              <Typography className="have_an_account" variant="body2">
                Don&apos;t have an account?
              </Typography>
              <Typography
                onClick={handleClick}
                className="forgot_pass"
                variant="body2"
              >
                Sign Up Here
              </Typography>
            </Box>
          </form>
          <CustomSnackbar
            open={snackbar.open}
            message={snackbar.message}
            severity={snackbar.severity}
            onClose={handleSnackbarClose}
          />
        </Box>
        <ForgotPasswordModal
          open={modalOpen}
          onClose={() => setModalOpen(false)} // Close the modal
        />
      </Container>
    </>
  );
}
