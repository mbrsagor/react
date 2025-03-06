import React from "react";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import QrCodeScannerOutlinedIcon from "@mui/icons-material/QrCodeScannerOutlined";

// eslint-disable-next-line react/prop-types
export default function RunningEvent({ title, date, thumbnail, scanHandler}) {
  return (
    <React.Fragment>
      <CssBaseline />
      <Box className="running_events">
        <Typography className="running_event_title" variant="h6">
          Running Event
        </Typography>
        <Box className="single_running_event">
          <Box className="banner">
            <img src={thumbnail} alt={title} />
          </Box>
          <Box className="event_info">
            <Typography className="event_title" variant="h6">
              {title}
            </Typography>
            <Typography className="event_date" variant="p">
              {date}
            </Typography>
            <Box className="scan_qr">
              <Button onClick={() => scanHandler()}>
                <QrCodeScannerOutlinedIcon /> Scan QR Code
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </React.Fragment>
  );
}
