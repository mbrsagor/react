import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";

import ToolsBar from "../../components/tools_bar";

export default function BulkRegistration() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container className="content">
        <ToolsBar link="/events/" title="Bulk Registration" />
        <Box className="parent_sec">
          <Box className="bulk_reg_sec">
            <Box>
              <Button
                type="submit"
                className="app_btn w100"
                variant="contained"
              >
                Scan QR Code
              </Button>
            </Box>
            <Box className="mt5">
              <Button
                type="submit"
                className="app_btn w100"
                variant="contained"
              >
                Verify Member QR Code
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
    </React.Fragment>
  );
}
