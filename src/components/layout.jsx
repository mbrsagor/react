import React from "react";
import Box from "@mui/material/Box";
import { Outlet } from "react-router-dom";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import FixedBottomNavigation from "./bottom_app_bar";
import ResponsiveAppBar from "./app_bar";

const Layout = () => {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container className="content">
        <ResponsiveAppBar />
      </Container>
      <Box>
        <Outlet />
      </Box>
      <FixedBottomNavigation />
    </React.Fragment>
  );
};

export default Layout;
