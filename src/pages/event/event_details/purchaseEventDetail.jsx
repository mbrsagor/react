import { useParams, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import { Typography, Button } from "@mui/material/";
import PlaceIcon from "@mui/icons-material/Place";
import Avatar from "@mui/material/Avatar";

import axios from "../../../services/axiosConfig";
import ToolsBar from "../../../components/tools_bar";
import { purchaseEventDetailURL } from "../../../services/api_service";
import DefaultThumbnail from "../../../assets/DefaultThumbnail.jpg";

export default function PurchaseEventDetail() {
  const [event, setEvent] = useState([]);
  const [packages, setPackage] = useState([]);
  const { id } = useParams(); // Extract id from route parameters
  const navigate = useNavigate();

  // Sent package ID and Event ID
  const data = {
    package_id: packages.id,
    event_id: event.id,
  };

  // Fetching event and package details
  const handleEventClick = () => {
    navigate("/event-ticket", { state: { data } }); // Send data
  };

  useEffect(() => {
    axios
      .get(purchaseEventDetailURL(id)) // Pass id to EventDetailURL
      .then((response) => {
        if (response) {
          setEvent(response.data.data.event);
          setPackage(response.data.data.package);
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
        <ToolsBar link="/sponsor-purchase-events/" title="Event Details" />
        <Box className="parent_sec pb80">
          <Box className="event_details_sec">
            <Box className="thumbnail-sec">
              <img
                src={event.thumbnail || DefaultThumbnail}
                alt={event.title}
              />
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
              <Box className="company_info">
                <Avatar
                  alt={event.company_name}
                  src="/static/images/avatar/1.jpg"
                />
                <Typography className="company_name" variant="p">
                  {event.company_name}
                </Typography>
              </Box>
              <Box className="venue">
                <Typography className="about_event_text" variant="h5">
                  Event Venue
                </Typography>
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
            <Box className="purchase_package_bottom">
              <Box className="single_package">
                <Typography className="package_name" variant="body1">
                  Package: {packages.title || "Unknown Package"}
                </Typography>
                <Typography className="package_price" variant="body1">
                  ${packages.unit_price || "$.00"} (Paid)
                </Typography>
              </Box>
            </Box>
            <Box className="get_ticket_sec">
              <Button
                variant="contained"
                className="modal_submit_btn"
                type="button"
                onClick={handleEventClick}
              >
                Get Tickets
              </Button>
              <Button
                variant="contained"
                className="modal_submit_btn"
                type="submit"
              >
                Get Ticket Link
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
    </React.Fragment>
  );
}
