import React, { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { Box, Avatar, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import CustomSnackbar from "../../components/snackbar";
// Reusable UserCard Component
// eslint-disable-next-line react/prop-types
const UserCard = ({ label, onClick, isSelected }) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      sx={{
        border: "2px solid",
        borderColor: isSelected ? "" : "grey.400",
        borderRadius: "15px",
        padding: 2,
        width: "fill-available",
        // marginBottom: 1,
        cursor: "pointer",
        backgroundColor: isSelected ? "" : "inherit",
        "&:hover": { borderColor: "" },
      }}
      onClick={onClick}
    >
      <Avatar
        sx={{
          bgcolor: isSelected ? "" : "grey.400",
          width: 30,
          height: 30,
          marginRight: 2,
        }}
      />
      <Typography variant="p">
        {label}
      </Typography>
    </Box>
  );
};

export default function UserType() {
  const location = useLocation();
  const [selectedType, setSelectedType] = useState(null); // State to track selected type
  // eslint-disable-next-line no-unused-vars
  const [phone, setPhone] = useState(location.state || "Unknown Phone"); // Fallback if state is undefined
  const navigate = useNavigate();

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "error"
  });

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleContinue = () => {
    if (selectedType) {
      // Navigate to the signup page with user type and phone number as state
      if (selectedType === "Sponsor") {
        navigate("/sponsor-signup", { state: { role: selectedType, phone } }); // Pass userType to the next route
      } else {
        navigate("/signup", { state: { role: selectedType, phone } }); // Pass userType to the next route
      }
    } else {
      setSnackbar({
        open: true,
        message: "Please select a user type!",
        severity: "error",
      });
    }
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container className="outer_content">
        <Box>
          <Typography className="header_headline" fontWeight={700} variant="p">
            Select User Type
          </Typography>
        </Box>
        <Box>
          <Typography className="phn_num_otp_text" variant="p">
            Let&apos;s start by telling us who you are
          </Typography>
          <Box
            className="mt10"
            display="flex"
            flexDirection="column"
            alignItems="center"
          >
            <UserCard
              label="Host"
              onClick={() => setSelectedType("Host")}
              isSelected={selectedType === "Host"}
            />
          </Box>
          <Box className="mt6">
            <UserCard
              label="Sponsor"
              onClick={() => setSelectedType("Sponsor")}
              isSelected={selectedType === "Sponsor"}
            />
          </Box>
          <Button
            onClick={handleContinue}
            className="auth_btn w100"
            variant="contained"
          >
            Continue
          </Button>
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
