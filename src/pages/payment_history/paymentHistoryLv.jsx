import React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import ToolsBar from "../../components/tools_bar";

export default function PaymentHistoryLv() {
  // modal
  const [modalOpen, setModalOpen] = React.useState(false);

  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);

  return (
    <React.Fragment>
      <CssBaseline />
      <Container className="content">
        <ToolsBar
          open={modalOpen}
          onClose={handleClose}
          handleOpen={handleOpen}
          link="/profile"
          title="Payment History"
        />
        <Box className="parent_sec">
          <Box className="mt5">
            <Typography className="no_data_text" variant="body">
              No Data Available
            </Typography>
          </Box>
        </Box>
      </Container>
    </React.Fragment>
  );
}
