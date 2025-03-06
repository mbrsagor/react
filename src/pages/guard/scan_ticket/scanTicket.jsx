import React, { useState, useEffect } from "react";
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
  // Model
  const [event, setEvents] = useState("");
  const [ticket_number, setTicketNumber] = useState("");
  const { event_id } = useParams(); // Get event_id from URL
  // messages
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "error",
  });

  // Fetch event
  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const response = await axios.get(EventDetailURL(event_id));
        if (response.status === 200) {
          setEvents(response.data.data); // Update state with the event data
        }
      } catch (error) {
        setSnackbar({
          open: true,
          message: "Error fetching event data:",
          error,
          severity: "error",
        });
      }
    };

    if (event_id) {
      fetchEventData(); // Call the function to fetch event data
    }
  }, [event_id]);

  // Handle form submit
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
        setTicketNumber(""); // Clear the ticket number after submission
      }
    } catch (error) {
      console.error("Error fetching event data:", error);
    }
  };

  // Snackbar
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
              <QrCodeScannerOutlinedIcon />
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
                  value={ticket_number} // Bind value to the state
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
