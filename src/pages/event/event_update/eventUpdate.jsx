import React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";

import ToolsBar from "../../../components/tools_bar";
import EventUpdateForm from "./eventUpdateFrom";

export default function EventUpdate() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container className="content">
        <ToolsBar link="/events" title="Update Event" />
        <Box className="parent_sec">
          <Box className="mt5">
            <EventUpdateForm />
          </Box>
        </Box>
      </Container>
    </React.Fragment>
  );
}
