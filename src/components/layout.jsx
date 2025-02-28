import React from "react";
import Box from "@mui/material/Box";
import { Outlet } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import FixedBottomNavigation from "./bottom_app_bar";

const Layout = () => {
  return (
    <React.Fragment>
      <CssBaseline />
      <Box>
        <Outlet />
      </Box>
      <FixedBottomNavigation />
    </React.Fragment>
  );
};

export default Layout;
