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

import axios from "../../../services/axiosConfig";
import { passwordChangeURL } from "../../../services/api_service";

export default function PasswordChangeModal({ open, onClose }) {
  // Modal
  const [old_password, setOldPassword] = useState("");
  const [new_password, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    // You can send the OTP to the entered phone number here
    try {
      const response = await axios.post(passwordChangeURL, {
        old_password: old_password,
        new_password: new_password,
      });
      if (response.status == 200) {
        navigate("/profile");
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
            value={old_password}
            onChange={(newPhone) => setOldPassword(newPhone)} // Correct onChange usage
          />
          <PhoneNumber
            value={new_password}
            onChange={(newPhone) => setNewPassword(newPhone)} // Correct onChange usage
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
