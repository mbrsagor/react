import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";


function ResponsiveAppBar() {
  const [userData, setUserData] = React.useState("");

  React.useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setUserData(JSON.parse(user)); // Parse and set user data
    }
  }, []);


  return (
    <AppBar className="app_bg" position="static">
      <Container className="content">
        <Toolbar className="header_top_section">
          <Typography variant="h6">
            {userData.fullname ? userData.fullname : "Anonymous user"}
          </Typography>
          <Avatar alt={userData.fullname} src="/static/images/avatar/2.jpg" />
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
