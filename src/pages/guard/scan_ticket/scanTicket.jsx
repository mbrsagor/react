import React, { useState, useEffect } from "react";
import QrScanner from "react-qr-scanner";
import { Box, Button, TextField } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { useParams } from "react-router-dom";

import QrCodeScannerOutlinedIcon from "@mui/icons-material/QrCodeScannerOutlined";

import axios from "../../../services/axiosConfig";
import CustomSnackbar from "../../../components/snackbar";
import { VerifyTicket, EventDetailURL } from "../../../services/api_service";
import ToolsBar from "../../../components/tools_bar";

export default function ScanTicket() {
  const [event, setEvents] = useState("");
  const [ticket_number, setTicketNumber] = useState("");
  const [showScanner, setShowScanner] = useState(false); // State to show/hide QR scanner
  const { event_id } = useParams(); // Get event_id from URL

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "error",
  });

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const response = await axios.get(EventDetailURL(event_id));
        if (response.status === 200) {
          setEvents(response.data.data);
        }
      } catch (error) {
        setSnackbar({
          open: true,
          message: `Error: ${error}`,
          severity: "error",
        });
      }
    };

    if (event_id) {
      fetchEventData();
    }
  }, [event_id]);

  // Submit handler
  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get(VerifyTicket(event_id, ticket_number));
      if (response.status === 200) {
        setSnackbar({
          open: true,
          message: response.data.message,
          severity: "success",
        });
        setTicketNumber("");
      }
    } catch (error) {
      console.error("Error verifying ticket:", error);
    }
  };

  // QR code submit handler
  const handleScan = async (data) => {
    if (data?.text) {
      // Extract the last part of the URL (ticket number)
      const scannedText = data.text.trim();
      const ticketParts = scannedText.split("/");
      const ticketNumber = ticketParts[ticketParts.length - 1]; // Get last part

      setTicketNumber(ticketNumber); // Store only the ticket number

      try {
        const response = await axios.get(VerifyTicket(event_id, ticketNumber));
        if (response.status === 200) {
          console.log("Scanned Ticket:", ticketNumber);
          setSnackbar({
            open: true,
            message: response.data.message,
            severity: "success",
          });
          setShowScanner(false);
        }
      } catch (error) {
        console.error("Error verifying scanned ticket:", error);
        setSnackbar({
          open: true,
          message: "Error verifying scanned ticket",
          severity: "error",
        });
      }
    }
  };



  const handleError = (err) => {
    console.error("QR Scanner Error:", err);
  };

  const toggleScanner = () => {
    setShowScanner(!showScanner);
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container className="content">
        <Box className="parent_sec">
          <ToolsBar link="/guard-home" title="QR Code Scan" />
          <Box className="scan_qr_code_sec">
            <Typography className="event_title" variant="h6">
              Event: {event.title}
            </Typography>
            <Box>
              <Typography className="scan_qr_code_text" variant="p">
                Scan the QR code to scan the ticket
              </Typography>
            </Box>
            <Box className="mt5">
              {/* Click Icon to Toggle Scanner */}
              <QrCodeScannerOutlinedIcon
                onClick={toggleScanner}
                style={{ cursor: "pointer", fontSize: "40px" }}
              />
              {showScanner && (
                <QrScanner
                  delay={300}
                  onError={handleError}
                  onScan={handleScan}
                  style={{ width: "100%", marginTop: "10px" }}
                />
              )}
            </Box>
            <Box>
              <Typography className="scan_qr_code" variant="body1">
                OR
              </Typography>
            </Box>
            <Box className="mt6 verify_qr_area">
              <form onSubmit={submitHandler}>
                <Typography className="scan_qr_code_text" variant="body1">
                  Enter Ticket Number Manually
                </Typography>
                <TextField
                  name="ticket_number"
                  className="common_field_text verify_qr_input"
                  placeholder="Write Here"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "15px",
                    },
                  }}
                  value={ticket_number}
                  onChange={(event) => setTicketNumber(event.target.value)}
                />
                <Button variant="contained" className="app_btn" type="submit">
                  Verify Ticket
                </Button>
              </form>
            </Box>
          </Box>
        </Box>
        <CustomSnackbar
          open={snackbar.open}
          message={snackbar.message}
          severity={snackbar.severity}
          onClose={handleSnackbarClose}
        />
      </Container>
    </React.Fragment>
  );
}
