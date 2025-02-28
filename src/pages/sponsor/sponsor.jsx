import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import axios from "../../services/axiosConfig";
import ToolsBar from "../../components/tools_bar";
import PhoneNumber from "../../components/phoneNumber";
import CustomSnackbar from "../../components/snackbar";
import { InvitationURL } from "./../../services/api_service";

export default function Sponsor() {
  const [phone, setPhone] = useState("");

  // messages
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "error",
  });

  // snackbar close action
  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // send invitation link to user phone number
    try {
      const response = await axios.post(InvitationURL, { phone });
      if (response.status == 200) {
        // Clear phone number field
        setPhone("");
        // open snackbar with success message
        setSnackbar({
          open: true,
          message: response.data.message,
          severity: "success",
        });
      } else {
        setSnackbar({
          open: true,
          message: response.data.message,
          severity: "error",
        });
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.response?.data?.message || "Something went wrong.",
        severity: "error",
      });
    }
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container className="content">
        <ToolsBar link="/home" title="Sponsor" />
        <Box className="parent_sec">
          <Box className="sponsor_section">
            <Typography className="sponsor_text" variant="body">
              Invite sponsors for a quick signup and offer event packages
              available for immediate purchase
            </Typography>
            <Box>
              <form onSubmit={handleSubmit}>
                <PhoneNumber
                  value={phone}
                  onChange={(newPhone) => setPhone(newPhone)} // Correct onChange usage
                />
                <Button
                  type="submit"
                  className="auth_btn w100 custom_padding"
                  variant="contained"
                >
                  Send Invitation Link
                </Button>
              </form>
            </Box>
          </Box>
        </Box>
        <CustomSnackbar
          open={snackbar.open}
          message={snackbar.message}
          severity={snackbar.severity}
          onClose={handleSnackbarClose}
        />
      </Container>
    </React.Fragment>
  );
}
