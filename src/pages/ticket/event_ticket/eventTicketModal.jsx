/* eslint-disable react/prop-types */
import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import LoopIcon from "@mui/icons-material/Loop";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import PrintOutlinedIcon from "@mui/icons-material/PrintOutlined";

import QRCode from "react-qr-code";
import CustomSnackbar from "../../../components/snackbar";


export default function EventTicketModal({ open, handleClose, ticket_number, qr, link }) {
  const [snackbar, setSnackbar] = React.useState({
    open: false,
    message: "",
    severity: "error",
  });
  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  // Copy ticket number clipboard
  const handleCopyTicketNumber = async () => {
    try {
      await navigator.clipboard.writeText(ticket_number);
      setSnackbar({
        open: true,
        message: "Ticket number copied to clipboard.",
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

  // Copy ticket link clipboard
  const handleCopyTicketLink = async () => {
    try {
      await navigator.clipboard.writeText(link);
      setSnackbar({
        open: true,
        message: "Ticket link copied to clipboard.",
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

  // Download QR code
  const downloadQRCodeNumber = () => {
    const svg = document.querySelector("#qr-code-modal");
    if (!svg) return;

    const serializer = new XMLSerializer();
    const svgBlob = new Blob([serializer.serializeToString(svg)], {
      type: "image/svg+xml",
    });
    const url = URL.createObjectURL(svgBlob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `qr_code_${ticket_number}.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };


  return (
    <Box>
      <Modal
        aria-labelledby="qr-code-title"
        aria-describedby="qr-code-description"
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
          <Box className="ticket_modal qr_code_scan_modal">
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
                  <LoopIcon className="save_qr_code" /> Copy Ticket Link
                </Typography>
                <Typography
                  onClick={handleCopyTicketLink}
                  className="copy_title"
                  variant="body1"
                >
                  <ContentCopyIcon className="save_qr_code" />
                  <span className="hidden_link">{link} </span>Copy Ticket Number
                </Typography>
                <Typography
                  onClick={downloadQRCodeNumber}
                  className="copy_title"
                  variant="body1"
                >
                  <PrintOutlinedIcon className="save_qr_code" /> Save QR Code
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
