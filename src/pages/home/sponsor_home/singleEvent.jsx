import React, { useState } from "react";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";

import axios from "../../../services/axiosConfig";
import CustomSnackbar from "../../../components/snackbar";
import { FavoriteEventURL } from "../../../services/api_service";


// eslint-disable-next-line react/prop-types
export default function SingleEvent({link, thumbnail, date, title, company_name, eventId}) {
  // State for form data
  // eslint-disable-next-line no-unused-vars
  const [formData, setFormData] = useState({
    event: eventId, // Initialize with eventId
  });

  // Snackbar state
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "error",
  });

  // Handle snackbar close
  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  // Handle form submission
  const handleSubmit = async () => {
    try {
      if (!eventId) {
        setSnackbar({
          open: true,
          message: "Event ID is missing.",
          severity: "error",
        });
        return;
      }
      const response = await axios.post(FavoriteEventURL, { event: eventId });
      setSnackbar({
        open: true,
        message: response.data.message,
        severity: "success",
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.response?.data?.message || "Something went wrong.",
        severity: "error",
      });
    }
  };

  return (
    <React.Fragment>
      <Box className="single_event_area">
        <Box className="event_thumb">
          <Link to={link}>
            <img src={thumbnail} alt={title} />
          </Link>
        </Box>
        <Box className="event_info">
          <Typography className="date" variant="body1">
            {date}
          </Typography>
          <Typography className="title" variant="body1">
            {title}
          </Typography>
          <Box className="event_bottom_sec">
            <Typography className="company_name" variant="body1">
              {company_name}
            </Typography>
            <Typography onClick={handleSubmit} className="save" variant="body1">
              <FavoriteBorderOutlinedIcon />
            </Typography>
          </Box>
        </Box>
      </Box>
      <CustomSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={handleSnackbarClose}
      />
    </React.Fragment>
  );
}
