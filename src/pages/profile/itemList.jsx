import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import KeyOutlinedIcon from "@mui/icons-material/KeyOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PaymentOutlinedIcon from "@mui/icons-material/PaymentOutlined";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import PersonRemoveOutlinedIcon from "@mui/icons-material/PersonRemoveOutlined";
import EditLocationAltOutlinedIcon from "@mui/icons-material/EditLocationAltOutlined";
import VolunteerActivismOutlinedIcon from "@mui/icons-material/VolunteerActivismOutlined";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";

import PasswordChangeModal from "./password_change/passwordChangeModal";

export default function ItemList() {
  const [userData, setUserData] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  // Fetch user data when component mounts and updates whenever user data changes in local storage.
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setUserData(JSON.parse(user)); // Parse and set user data
    }
  }, []);

  return (
    <Container className="profile_item_lv">
      <Link to={`/profile_update/${userData.user_id}`}>
        <Box className="item">
          <EditLocationAltOutlinedIcon />
          <Typography variant="p">Edit Profile </Typography>
        </Box>
      </Link>
      <Link to="#">
        <Box className="item">
          <KeyOutlinedIcon />
          <Typography variant="p">Change Password</Typography>
        </Box>
      </Link>
      <Link to="/home">
        <Box className="item">
          <EmailOutlinedIcon />
          <Typography variant="p">Change Account</Typography>
        </Box>
      </Link>
      <Link to="/home">
        <Box className="item">
          <PersonRemoveOutlinedIcon />
          <Typography variant="p">Delete Account</Typography>
        </Box>
      </Link>
      <Link to="/home">
        <Box className="item">
          <PaymentOutlinedIcon />
          <Typography variant="p">Payment History</Typography>
        </Box>
      </Link>
      <Link to="/home">
        <Box className="item">
          <VolunteerActivismOutlinedIcon />
          <Typography variant="p">Share Donation Link</Typography>
        </Box>
      </Link>
      <Link to="/home">
        <Box className="item">
          <AdminPanelSettingsOutlinedIcon />
          <Typography variant="p">Settings</Typography>
        </Box>
      </Link>
      <Link to="/home">
        <Box className="item">
          <ExitToAppOutlinedIcon />
          <Typography variant="p">Sign Out</Typography>
        </Box>
      </Link>
      <PasswordChangeModal
        open={modalOpen}
        onClose={() => setModalOpen(false)} // Close the modal
      />
    </Container>
  );
}
