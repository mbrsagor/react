import React from "react";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
// import Switch from "@mui/material/Switch";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import ToolsBar from "../../components/tools_bar";
// import { ThemeContext } from "../../context/ThemeContext";

export default function Settings() {
  // const { darkMode, toggleTheme } = React.useContext(ThemeContext);
  const [userData, setUserData] = React.useState("");

  // Fetch user data when component mounts and updates whenever user data changes in local storage.
  React.useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setUserData(JSON.parse(user)); // Parse and set user data
    }
  }, []);

  return (
    <React.Fragment>
      <CssBaseline />
      <Container className="content">
        {userData.role === 3 ? (
          <ToolsBar link="/home" title="Settings" />
        ) : userData.role === 4 ? (
          <ToolsBar link="/sponsor-home/" title="Settings" />
        ) : userData.role === 5 ? (
          <ToolsBar link="/guard-home/" title="Settings" />
        ) : null}
        <Box className="parent_sec pb80">
          <Box className="settings">
            {/* <Box className="app_list">
              <Typography className="app_setting_title" variant="p">
                Change App Theme
              </Typography>
              <Box className="app_item">
                <Typography className="app_control_title" variant="p">
                  Light
                </Typography>
                <Switch
                  checked={true}
                  // onChange={toggleTheme} // Use context function to toggle theme
                  inputProps={{ "aria-label": "controlled" }}
                />
              </Box>
            </Box> */}
            <Box className="app_list">
              <Typography className="app_setting_title" variant="p">
                App Version
              </Typography>
              <Box className="app_item pb15">
                <Typography className="app_control_title" variant="p">
                  1.0-Beta (2)
                </Typography>
              </Box>
            </Box>
            <Box className="app_list">
              <Typography className="app_setting_title" variant="p">
                Your Feedback
              </Typography>
              <Box className="app_item pb15">
                <Typography className="app_control_title" variant="p">
                  <Link to="/feedback">Add your important feedback</Link>
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </React.Fragment>
  );
}
