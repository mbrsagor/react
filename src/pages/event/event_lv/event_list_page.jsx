import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import axios from "../../../services/axiosConfig";
import Events from "./events";
import ToolsBar from "../../../components/tools_bar";
import BottomMenuModal from "../../../components/bottom_modal";
import { MyEvents } from "../../../services/api_service";

export default function EventListPage() {
  const [events, setEvents] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);

  useEffect(() => {
    axios
      .get(MyEvents)
      .then((response) => {
        if (response) {
          // console.log(response.data.data);
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
          link="/home"
          title="Event"
        />
        <Box className="parent_sec">
          {events && events.length > 0 ? (
            events.map((event) => (
              <Events
                key={event.id}
                banner={event.thumbnail}
                title={event.title}
                start_date={event.start_date}
                end_date={event.end_date}
                venue={event.location}
                tags={event.tags}
                update_link="#"
                delete_link="#"
                detail_link={`/event/${event.id}`}
              />
            ))
          ) : (
            <Typography className="no_data_text" variant="body">
              No Data Available
            </Typography>
          )}
          <BottomMenuModal
            open={modalOpen}
            onClose={() => setModalOpen(false)}
          />
        </Box>
      </Container>
    </React.Fragment>
  );
}
