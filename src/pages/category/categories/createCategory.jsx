import React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";

import ToolsBar from "../../../components/tools_bar";

export default function CreateCategory() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container className="content">
        <ToolsBar link="/events" title="Create Event" />
        <Box className="parent_sec">
          <Box className="mt5">
            <h2>Create new category</h2>
          </Box>
        </Box>
      </Container>
    </React.Fragment>
  );
}
