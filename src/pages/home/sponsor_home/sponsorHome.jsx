import React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";

import ResponsiveAppBar from "../../../components/app_bar";
import SponsorEventList from "./sponsorEventList";

export default function SponsorHome() {
  return (
    <React.Fragment>
      <CssBaseline />
      <ResponsiveAppBar />
      <Container className="content">
        <Box className="parent_sec pb80">
          <SponsorEventList />
        </Box>
      </Container>
    </React.Fragment>
  );
}
