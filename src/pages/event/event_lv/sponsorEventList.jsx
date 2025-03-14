import React, { useState, useEffect } from "react";
import { Box, Typography, Container } from "@mui/material";
// import { Link } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";

import Events from "./events";
import ToolsBar from "../../../components/tools_bar";
import axios from "../../../services/axiosConfig";
import { PurchaseEventListURL } from "../../../services/api_service";
import FavoriteEventModal from "../../../components/favEventModal";

export default function SponsorEventList() {
  const [modalOpen, setModalOpen] = useState(false);
  const [events, setEvents] = useState([]);

  // Modal handle
  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);

  // Fetching my purchase events data
  useEffect(() => {
    axios
      .get(PurchaseEventListURL)
      .then((response) => {
        if (response) {
          // console.log(response.data);  // Debugging purpose only, remove it before production.
          setEvents(response.data.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
        setEvents([]);
      });
  }, []);

  return (
    <React.Fragment>
      <CssBaseline />
      <Container className="content">
        <ToolsBar
          open={modalOpen}
          onClose={handleClose}
          handleOpen={handleOpen}
          link="/sponsor-home"
          title="My Event"
        />
        <Box className="parent_sec pb80">
          {events && events.length > 0 ? (
            events.map((event) => (
              // <Link key={event.id} to={`/purchase-event-detail/${event.id}`}>
              <Events
                key={event.id}
                detail_link={`/purchase-event-detail/${event.id}`}
                banner={event.event.thumbnail}
                title={event.event.title}
                start_date={event.event.start_date}
                end_date={event.event.end_date}
                venue={event.event.location}
                tags={event.event.tags}
              />
              // </Link>
            ))
          ) : (
            <Typography className="no_data_text" variant="body">
              No Data Available
            </Typography>
          )}
          <FavoriteEventModal
            open={modalOpen}
            onClose={() => setModalOpen(false)}
          />
        </Box>
      </Container>
      <Box className="parent_sec pb80"></Box>
    </React.Fragment>
  );
}
