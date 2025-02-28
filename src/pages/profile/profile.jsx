import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import ToolsBar from "../../components/tools_bar";
import Avatar from "../../assets/avatar.png";
import ItemList from "./itemList";

import axios from "../../services/axiosConfig";
import { profileURL } from "../../services/api_service";

export default function Profile() {
  const [userData, setUserData] = useState("");

  // Fetch user data when component mounts and updates whenever user data changes in local storage.
  useEffect(() => {
    axios.get(profileURL).then((response) => {
      if (response) {
        const profile_data = response.data.data;
        setUserData({
          ...profile_data,
        });
      }
    });
  }, []);

  return (
    <React.Fragment>
      <CssBaseline />
      <Container className="content">
        {userData.role === 3 ? (
          <ToolsBar link="/home" title="Profile" />
        ) : userData.role === 4 ? (
          <ToolsBar link="/sponsor-home/" title="Profile" />
        ) : userData.role === 5 ? (
          <ToolsBar link="/guard-home/" title="Profile" />
        ) : null}
        <Box className="parent_sec pb80">
          <Box className="profile_sec">
            <Box className="profile_header">
              <Box className="avatar">
                <img
                  src={userData.avatar ? userData.avatar : Avatar}
                  alt={userData.fullname}
                />
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
