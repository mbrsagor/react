import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import { Link } from "react-router-dom";

import ProfilePic from "../assets/avatar.png";
import { profileURL } from "../services/api_service";
import axios from "../services/axiosConfig";


function ResponsiveAppBar() {
  const [userData, setUserData] = React.useState("");

  React.useEffect(() => {
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
    <Container className="content">
      <AppBar className="app_bg">
        <Toolbar className="header_top_section">
          <Box>
            <Typography className="header_wlc_text" variant="p">
              Welcome
            </Typography>
            <Typography className="user_name" variant="h6">
              {userData.fullname ? userData.fullname : "Anonymous user"}
            </Typography>
          </Box>
          <Link to="/profile">
            <Avatar
              alt={userData.fullname}
              src={userData.avatar ? userData.avatar : ProfilePic}
              sx={{ width: 60, height: 60 }}
            />
          </Link>
        </Toolbar>
      </AppBar>
    </Container>
  );
}
export default ResponsiveAppBar;
