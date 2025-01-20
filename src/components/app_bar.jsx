import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import ProfilePic from "../assets/avatar.png";


function ResponsiveAppBar() {
  const [userData, setUserData] = React.useState("");

  React.useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setUserData(JSON.parse(user)); // Parse and set user data
    }
  }, []);


  return (
    <Container className="content">
      <AppBar className="app_bg" position="static">
        <Toolbar className="header_top_section">
          <Box>
            <Typography className="header_wlc_text" variant="p">
              Welcome
            </Typography>
            <Typography className="user_name" variant="h6">
              {userData.fullname ? userData.fullname : "Anonymous user"}
            </Typography>
          </Box>
          <Avatar
            alt={userData.fullname}
            src={ProfilePic}
            sx={{ width: 60, height: 60 }}
          />
        </Toolbar>
      </AppBar>
    </Container>
  );
}
export default ResponsiveAppBar;
