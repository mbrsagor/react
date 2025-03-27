import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import { Box, Typography, Container, Button } from "@mui/material";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import DocumentScannerOutlinedIcon from "@mui/icons-material/DocumentScannerOutlined";

import axios from "../../../services/axiosConfig";
import ToolsBar from "../../../components/tools_bar";
import { GuardAssignEvents } from "../../../services/api_service";
import DefaultThumbnail from "../../../assets/DefaultThumbnail.jpg";

export default function AssignEvent() {
  // Model
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  // Fetching my  events data
  useEffect(() => {
    axios
      .get(GuardAssignEvents)
      .then((response) => {
        if (response) {
          //   console.log(response.data); // Debugging purpose only, remove it before production.
          setEvents(response.data.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
        setEvents([]);
      });
  }, []);

  // Sent event id scan qr code screen
  const scanHandler = (event_id) => {
    navigate(`/scan-qr/${event_id}`); // Pass event_id in the URL
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container className="content">
        <ToolsBar link="/guard-home" title="My Event" />
        <Box className="parent_sec">
          <Box className="assign_event">
            {events && events.length > 0 ? (
              events.map((event, index) => (
                <Box key={index} className="single_assign_event">
                  <img src={event.event.thumbnail || DefaultThumbnail} alt={event.event.title} />
                  <Box className="event_content">
                    <Typography className="event_title" variant="h5">
                      {event.event.title}
                    </Typography>
                    <Box className="duration mt6">
                      <Typography className="event_duration" variant="h6">
                        Event Duration
                      </Typography>
                      <Typography className="date" variant="body1">
                        Start: {event.event.start_date}
                      </Typography>
                      <Typography className="date" variant="body1">
                        End: {event.event.end_date}
                      </Typography>
                      <Box className="address">
                        <PlaceOutlinedIcon />
                        <Typography className="date" variant="body1">
                          {event.event.location}
                        </Typography>
                      </Box>
                    </Box>
                    <Box className="scan_qr">
                      <Button onClick={() => scanHandler(event.event.id)}>
                        <DocumentScannerOutlinedIcon /> Scan QR code
                      </Button>
                    </Box>
                  </Box>
                </Box>
              ))
            ) : (
              <Typography className="no_data_text" variant="body">
                No Data Available
              </Typography>
            )}
          </Box>
        </Box>
      </Container>
    </React.Fragment>
  );
}
