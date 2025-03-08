import React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
// import Typography from "@mui/material/Typography";

import ToolsBar from "../../../components/tools_bar";
import Filter from "./filter";

export default function TransactionHistoryFilter() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container className="content">
        <ToolsBar link="/payment-history" title="Filter Transaction" />
        <Box className="parent_sec pb80">
          <Box>
            <Filter />
          </Box>
        </Box>
      </Container>
    </React.Fragment>
  );
}
