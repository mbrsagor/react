import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import LoopIcon from "@mui/icons-material/Loop";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

import QRCode from "react-qr-code";
import CustomSnackbar from "../../../components/snackbar";

// eslint-disable-next-line react/prop-types
export default function EventTicketModal({ open, handleClose, ticket_number, qr, link }) {
    const [snackbar, setSnackbar] = React.useState({
      open: false,
      message: "",
      severity: "error",
    });
    const handleSnackbarClose = () => {
      setSnackbar({...snackbar, open: false });
    };

  // Copy link clipboard
  const handleCopyTicketNumber = async () => {
    try {
      await navigator.clipboard.writeText(ticket_number);
      setSnackbar({
        open: true,
        message: "Link copied to clipboard.",
        severity: "success",
      });
    } catch (err) {
      setSnackbar({
        open: true,
        message: "Failed to copy text: ",
        err,
        severity: "error",
      });
    }
  };
    
    const handleCopyTicketLink = async () => {
    try {
      await navigator.clipboard.writeText(link);
      setSnackbar({
        open: true,
        message: "Link copied to clipboard.",
        severity: "success",
      });
    } catch (err) {
      setSnackbar({
        open: true,
        message: "Failed to copy text: ",
        err,
        severity: "error",
      });
    }
  };

  return (
    <Box>
      <Modal
        aria-labelledby="category-title"
        aria-describedby="category-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box className="ticket_modal">
            <Box className="mt15 modal_main_qr_sec">
              <QRCode value={qr} />
              <Typography className="ticket_number" variant="body1">
                Ticket No: {ticket_number}
              </Typography>
              <Typography className="ready_for_scan" variant="body1">
                Ready For Scan
              </Typography>
              <Box className="copay_sec">
                <Typography
                  onClick={handleCopyTicketNumber}
                  className="copy_title"
                  variant="body1"
                >
                  <LoopIcon /> Copy Ticket Link
                </Typography>
                <Typography
                  onClick={handleCopyTicketLink}
                  className="copy_title"
                  variant="body1"
                >
                  <ContentCopyIcon /> <span className="hidden_link">{link} </span>Copy Ticket Number
                </Typography>
              </Box>
            </Box>
          </Box>
        </Fade>
      </Modal>
      <CustomSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={handleSnackbarClose}
      />
    </Box>
  );
}
