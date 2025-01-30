import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import ToolsBar from "../../components/tools_bar";
import Avatar from "../../assets/avatar.png";
import ItemList from './itemList';

export default function Profile() {
  const [userData, setUserData] = useState("");

  // Fetch user data when component mounts and updates whenever user data changes in local storage.
  useEffect(() => {
      const user = localStorage.getItem("user");
      if (user) {
        setUserData(JSON.parse(user)); // Parse and set user data
      }
    }, []);
  
  return (
    <React.Fragment>
      <CssBaseline />
      <Container className="content">
        <ToolsBar link="/home" title="Profile" />
        <Box className="parent_sec">
          <Box className="profile_sec">
            <Box className="profile_header">
              <Box className="avatar">
                <img src={Avatar} alt="User Avatar" />
              </Box>
              <Box className="user_info">
                <Typography className="username" variant="h6">
                  {userData.fullname}
                </Typography>
                <Typography className="email" variant="p">
                  {userData.email}
                </Typography>
                <Box className="mt10">
                  <Typography className="role" variant="p">
                    {userData.role_name}
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box className="mt5">
              <ItemList />
            </Box>
          </Box>
          {/* Add your profile details here */}
        </Box>
      </Container>
    </React.Fragment>
  );
}
