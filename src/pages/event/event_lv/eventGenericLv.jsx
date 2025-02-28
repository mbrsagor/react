import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import axios from "../../../services/axiosConfig";
import ToolsBar from "../../../components/tools_bar";
import SingleEvent from "../../home/sponsor_home/singleEvent";
import { SeeMoreEvents } from "../../../services/api_service";
import DefaultThumbnail from "../../../assets/DefaultThumbnail.jpg";

export default function EventGenericLv() {
  // Navigation
  const location = useLocation();
  const { eventCatID, title } = location.state || {}; // Handle cases where state is undefined
  const [events, setEvents] = useState([]);
  // Fetching my events data
  useEffect(() => {
    axios
      .get(SeeMoreEvents(eventCatID))
      .then((response) => {
        if (response) {
          //   console.log(response.data.data);
          setEvents(response.data.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
        setEvents([]);
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <React.Fragment>
      <CssBaseline />
      <Container className="content">
        <ToolsBar link="/sponsor-home" title={title} />
        <Box className="parent_sec pb80">
          <Box className="sponsor_event_list">
            {events.length > 0 ? (
              events.map((event, index) => (
                <SingleEvent
                  key={index}
                  link={`/sponsor-event/${event.id}`}
                  eventId={event.id}
                  thumbnail={
                    event.thumbnail ? event.thumbnail : DefaultThumbnail
                  } // Default if missing
                  title={event.title}
                  date={event.start_date}
                  company_name={event.company_name}
                />
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
