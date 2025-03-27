import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Box, Typography, Container, Button } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";

import axios from "../../../services/axiosConfig";
import ToolsBar from "../../../components/tools_bar";
import CustomSnackbar from "../../../components/snackbar";
import DefaultThumbnail from "../../../assets/DefaultThumbnail.jpg";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import {
  FavoriteSavedEventURL,
  DeleteFavoriteEventURL,
} from "../../../services/api_service";

export default function FavoriteEvent() {
  // State for events
  const [events, setEvents] = useState([]);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "error",
  });

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  // Fetching favorite events data
  useEffect(() => {
    axios
      .get(FavoriteSavedEventURL)
      .then((response) => {
        if (response.data) {
          setEvents(response.data.data);
        }
      })
      .catch((error) => {
        setSnackbar({
          open: true,
          message: error.response?.data?.message || "Error fetching events.",
          severity: "error",
        });
        setEvents([]);
      });
  }, []);

  // Function to remove favorite event
  const RemoveFavoriteEventHandel = (id) => {
    axios
      .delete(DeleteFavoriteEventURL(id)) // Ensure DeleteFavoriteEventURL is a function
      .then((response) => {
        setSnackbar({
          open: true,
          message: response.data.message || "Event removed successfully.",
          severity: "success",
        });

        // Update the list to remove the deleted event
        setEvents((prevEvents) =>
          prevEvents.filter((event) => event.id !== id)
        );
      })
      .catch((error) => {
        setSnackbar({
          open: true,
          message: error.response?.data?.message || "Something went wrong.",
          severity: "error",
        });
      });
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container className="content">
        <ToolsBar link="/sponsor-home" title="Favorite Events" />
        <Box className="parent_sec pb80">
          {events.length > 0 ? (
            events.map((event) => (
              <Box key={event.id} className="single_favorite_box">
                <Box className="favorite_image">
                  <Link to={`/purchase-event-detail/${event.id}`}>
                    <img
                      src={event.event?.thumbnail || DefaultThumbnail}
                      alt={event.event?.title || "Event"}
                    />
                  </Link>
                </Box>
                <Box className="favorite_text">
                  <Link to={`/purchase-event-detail/${event.id}`}>
                    <Typography variant="body2">
                      {event.event?.start_date}
                    </Typography>
                    <Typography className="title" variant="h6">
                      {event.event?.title}
                    </Typography>
                  </Link>
                  <Box className="favorite_btn">
                    <Typography variant="body2">
                      {event.event?.company_name}
                    </Typography>
                    <Button
                      onClick={() => RemoveFavoriteEventHandel(event.id)}
                      className="btn"
                    >
                      <DeleteOutlineOutlinedIcon />
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
      </Container>
      <CustomSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={handleSnackbarClose}
      />
    </React.Fragment>
  );
}
