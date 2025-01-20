import React, { useState } from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import ToolsBar from "../../components/tools_bar";
import BottomMenuModal from "../../components/bottom_modal";

export default function Guard() {

  const [modalOpen, setModalOpen] = useState(false);
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
          link="/home"
          title="Guard"
        />
        <Box className="parent_sec">
          <Typography className="no_data_text" variant="body">
            No Data Available
          </Typography>
          <BottomMenuModal
            open={modalOpen}
            onClose={() => setModalOpen(false)} // Close the modal
          />
        </Box>
      </Container>
    </React.Fragment>
  );
}
