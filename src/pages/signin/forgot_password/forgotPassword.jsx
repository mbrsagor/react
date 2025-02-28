import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PhoneNumber from "../../../components/phoneNumber";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Sheet from "@mui/joy/Sheet";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Alert from "@mui/material/Alert";

import axios from "axios";
import { passwordResetURL } from '../../../services/api_service';

// eslint-disable-next-line react/prop-types
export default function ForgotPasswordModal({ open, onClose }) {
    const [phone, setPhone] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    
    const handleSubmit = async (event) => {
        event.preventDefault();
      // You can send the OTP to the entered phone number here
      try {
        const response = await axios.post(passwordResetURL, {
          phone: phone, // Payload sent to the backend
        });
        if (response.status == 200) {
          navigate("/change-password", { state: phone });
        } else {
            setError(response.data.message);
        }
      } catch (err) {
        setError(err.response?.data?.message || "Something went wrong.");
      }
    };

  return (
    <Modal
      aria-labelledby="modal-title"
      aria-describedby="modal-desc"
      open={open}
      onClose={onClose} // Call onClose when modal is closed
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Sheet
        variant="outlined"
        sx={{
          maxWidth: 500,
          borderRadius: "md",
          p: 3,
        }}
      >
        <ModalClose variant="plain" sx={{ m: 1 }} onClick={onClose} />
        <Typography
          className="forgot_password_title"
          id="modal-title"
          variant="body1"
        >
          Forgot password!
        </Typography>
        <Box className="mb10">
          <Typography variant="body2">Enter your phone number</Typography>
        </Box>
        <form onSubmit={handleSubmit}>
          <PhoneNumber
            value={phone}
            onChange={(newPhone) => setPhone(newPhone)} // Correct onChange usage
          />
          {error && <Alert severity="warning">{error}</Alert>}
          <Button type="submit" className="auth_btn w100" variant="contained">
            Send OTP
          </Button>
        </form>
      </Sheet>
    </Modal>
  );
}
