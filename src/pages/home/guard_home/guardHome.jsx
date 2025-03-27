import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import ResponsiveAppBar from "../../../components/app_bar";
import GuardCounter from "./guardCounter";
import RunningEvent from "./runningEvent";

import axios from "../../../services/axiosConfig";
import { GuardHomeURL } from "../../../services/api_service";
import DefaultThumbnail from "../../../assets/DefaultThumbnail.jpg";

export default function GuardHome() {
  // Model
  const [events, setEvent] = useState();
  const [counters, setCounters] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch data from an API
    axios
      .get(GuardHomeURL) // Actual API endpoint
      .then((response) => {
        setCounters(response.data.dashboard);
        setEvent(response.data.today_events);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Sent event id scan qr code screen
  const scanHandler = (event_id) => {
    navigate(`/scan-qr/${event_id}`); // Pass event_id in the URL
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <ResponsiveAppBar />
      <Container className="content">
        <Box className="parent_sec">
          <Box>
            {counters && counters.length > 0 ? (
              counters.map((counter, index) => (
                <GuardCounter
                  key={index}
                  title={counter.title}
                  counter={counter.count}
                />
              ))
            ) : (
              <Typography className="no_data_text" variant="body">
                No Data Available
              </Typography>
            )}
          </Box>
          <Box>
            {events && events.length > 0 ? (
              events.map((event, index) => (
                <RunningEvent
                  key={index}
                  scanHandler={() => scanHandler(event.event.id)}
                  thumbnail={event.event.thumbnail || DefaultThumbnail}
                  title={event.event.title}
                  date={event.event.start_date}
                />
              ))
            ) : (
              <Typography className="no_data_text" variant="body">
                No Event Available Today
              </Typography>
            )}
          </Box>
        </Box>
      </Container>
    </React.Fragment>
  );
}
