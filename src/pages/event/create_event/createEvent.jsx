import React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";

import ToolsBar from "../../../components/tools_bar";
import EventForm from "./eventForm";

export default function CreateEvent() {


  return (
    <React.Fragment>
      <CssBaseline />
      <Container className="content">
        <ToolsBar link="/events" title="Create Event" />
        <Box className="parent_sec">
          <Box className="mt5">
            <EventForm />
          </Box>
        </Box>
      </Container>
    </React.Fragment>
  );
}
