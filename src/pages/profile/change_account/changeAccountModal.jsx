import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Sheet from "@mui/joy/Sheet";
import Modal from "@mui/joy/Modal";

import axios from "../../../services/axiosConfig";
import PhoneNumber from "../../../components/phoneNumber";
import { changePhoneNumberURL } from "../../../services/api_service";
import CustomLoader from "../../../components/customLoader";
import CustomSnackbar from "../../../components/snackbar";

// eslint-disable-next-line react/prop-types
export default function ChangeAccountModal({ open, onClose }) {
  const [phone, setPhone] = useState("");
  const [userData, setUserData] = useState("");
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "error",
  });

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setUserData(JSON.parse(user)); // Parse and set user data
    }
  }, []);

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await axios.put(changePhoneNumberURL(userData.user_id), {
        phone: phone,
      });

      if (response.status === 200) {
        setSnackbar({
          open: true,
          message: response.data.message,
          severity: "success",
        });

        // Reset input field
        setPhone("");

        // Close modal after success
        setTimeout(() => {
          onClose();
        }, 1000); // Short delay to allow the message to be seen
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

  return (
    <Modal
      aria-labelledby="modal-title"
      aria-describedby="modal-desc"
      className="password_change_modal_section"
      open={open}
      onClose={() => {
        setPhone(""); // Clear phone field when closing
        onClose();
      }}
    >
      <Sheet variant="outlined" className="password_change_modal">
        <Typography
          className="forgot_password_title"
          id="modal-title"
          variant="h6"
        >
          Change Account
        </Typography>
        <Box className="mb10 mt6">
          <Typography className="change_pass_desc" variant="body1">
            Changing your phone number will update your sign-in phone. Please
            ensure you want to proceed before making this change.
          </Typography>
        </Box>
        <form onSubmit={handleSubmit}>
          <Box className="mb10 mt5">
            <PhoneNumber
              value={phone}
              onChange={(newPhone) => setPhone(newPhone)}
            />
          </Box>
          <Button type="submit" className="app_btn" variant="contained">
            Submit
          </Button>
        </form>
        {loading && <CustomLoader />}
        <CustomSnackbar
          open={snackbar.open}
          message={snackbar.message}
          severity={snackbar.severity}
          onClose={handleSnackbarClose}
        />
      </Sheet>
    </Modal>
  );
}
