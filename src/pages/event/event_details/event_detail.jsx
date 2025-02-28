import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import PlaceIcon from "@mui/icons-material/Place";

import axios from "../../../services/axiosConfig";
import ToolsBar from "../../../components/tools_bar";
import { EventDetailURL } from "../../../services/api_service";

export default function EventDetails() {
  const [event, setEvent] = useState([]);
  const [packages, setPackages] = useState([]);
  const { id } = useParams(); // Extract id from route parameters

  useEffect(() => {
    axios
      .get(EventDetailURL(id)) // Pass id to EventDetailURL
      .then((response) => {
        if (response) {
          // console.log(response.data.data);
          setEvent(response.data.data);
          setPackages(response.data.data.packages);
        }
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
        setEvent([]);
      });
  }, [id]);

  return (
    <React.Fragment>
      <CssBaseline />
      <Container className="content">
        <ToolsBar link="/events/" title="Event Details" />
        <Box className="parent_sec pb80">
          <Box className="event_details_sec">
            <Box className="thumbnail-sec">
              <img src={event.thumbnail} alt={event.title} />
            </Box>
            <Box className="capacity_sec">
              <Box className="single_capacity_box">
                <Typography className="capacity_counter" variant="h6">
                  {event.dashboard?.event_capacity ?? "0"}
                </Typography>
                <Typography variant="p">Event Capacity</Typography>
              </Box>
              <Box className="single_capacity_box">
                <Typography className="capacity_counter" variant="h6">
                  {event.current_attendees}
                </Typography>
                <Typography variant="p">Current Attendees</Typography>
              </Box>
              <Box className="single_capacity_box">
                <Typography className="capacity_counter" variant="h6">
                  {event.total_attendees}
                </Typography>
                <Typography variant="p">Total Attendees</Typography>
              </Box>
            </Box>
            <Box className="capacity_bottom_sec">
              <Typography className="event_time" variant="p">
                {event.start_date}
              </Typography>
              <Typography className="category_text" variant="p">
                {event.category_name}
              </Typography>
            </Box>
            <Box className="event_info">
              <Typography className="event_title" variant="h6">
                {event.title}
              </Typography>
              <Box className="venue">
                <PlaceIcon />
                <Typography className="event_venue" variant="p">
                  {event.location}
                </Typography>
              </Box>
            </Box>
            <Box className="event_description">
              <Typography className="about_event_text" variant="h5">
                About this Event
              </Typography>
              <Typography className="event_content" variant="p">
                {event.description}
              </Typography>
            </Box>
            <Box className="mt10">
              <Typography className="about_event_text" variant="h5">
                Related To This Event
              </Typography>
            </Box>
            <Box className="tag_main_sec">
              {event.tags && event.tags.length > 0 ? (
                event.tags.map((tag, i) => (
                  <Typography key={i} className="event_detail_tag" variant="p">
                    {tag}
                  </Typography>
                ))
              ) : (
                <Typography variant="body1">
                  No tags available for this event.
                </Typography>
              )}
            </Box>
            <Box className="mt5">
              <Typography className="about_event_text" variant="h5">
                Package
              </Typography>
            </Box>
            <Box className="event_details_package_sec">
              {packages.length > 0 ? (
                packages.map((pack) => (
                  <Box key={pack.id} className="single_package">
                    <Typography className="package_name" variant="body1">
                      {pack.title}
                    </Typography>
                    <Typography className="package_price" variant="body1">
                      ${pack.unit_price}
                    </Typography>
                    <Typography className="package_desc" variant="body1">
                      {pack.description}
                    </Typography>
                  </Box>
                ))
              ) : (
                <Typography variant="body">No Package Available</Typography>
              )}
            </Box>
          </Box>
        </Box>
      </Container>
    </React.Fragment>
  );
}
