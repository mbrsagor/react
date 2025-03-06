import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Sheet from "@mui/joy/Sheet";
import Modal from "@mui/joy/Modal";

import axios from "../../../services/axiosConfig";
import { deleteAccountURL } from "../../../services/api_service";
import CustomLoader from "../../../components/customLoader";
import CustomSnackbar from "../../../components/snackbar";

// eslint-disable-next-line react/prop-types
export default function DeleteAccount({ open, onClose }) {
  const [userData, setUserData] = useState("");
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "error",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setUserData(JSON.parse(user)); // Parse and set user data
    }
  }, []);

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  // Delete user data API calls
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await axios.delete(deleteAccountURL(userData.user_id));
      if (response.status === 200) {
        // Destroy the account after clear token.
        localStorage.removeItem("token");
        localStorage.clear();
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

  return (
    <Modal
      aria-labelledby="modal-title"
      aria-describedby="modal-desc"
      className="password_change_modal_section"
      open={open}
      onClose={() => {
        onClose();
      }}
    >
      <Sheet variant="outlined" className="password_change_modal">
        <Typography
          className="forgot_password_title"
          id="modal-title"
          variant="h6"
        >
          Warning
        </Typography>
        <Box className="mb10 mt6">
          <Typography className="change_pass_desc" variant="body1">
            Deleting your account will permanently erase all your data. This
            account is irreversible. you are sure you want to processed?
          </Typography>
        </Box>
        <form onSubmit={handleSubmit}>
          <Box className="delete_account">
            <Button type="submit" className="" variant="contained">
              Yes
            </Button>
            <Button
              type="button"
              className=""
              variant="contained"
              onClick={onClose}
            >
              Not Now
            </Button>
          </Box>
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
