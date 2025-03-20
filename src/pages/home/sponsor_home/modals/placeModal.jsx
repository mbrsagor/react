import React, { useState } from "react";
import Fade from "@mui/material/Fade";
import Modal from "@mui/material/Modal";
import SearchIcon from "@mui/icons-material/Search";
import { Typography, Box, CssBaseline, TextField, InputAdornment } from "@mui/material";

// eslint-disable-next-line react/prop-types
export default function PlaceModal({ open, handleClose, setFilters, fetchEvents }) {
  const [localLocation, setLocalLocation] = useState(""); // Local input field state

  // Handle input change
  const handleLocationChange = (event) => {
    setLocalLocation(event.target.value);
  };

  // Handle Enter key press for search
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent default form submission

      setFilters((prevFilters) => {
        const newFilters = { ...prevFilters, location: localLocation };
        fetchEvents(newFilters); // ✅ Fetch events dynamically
        return newFilters;
      });

      setLocalLocation(""); // ✅ Clear input field
      handleClose(); // ✅ Close modal
    }
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Box>
        <Modal
          aria-labelledby="location-title"
          aria-describedby="location-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          slotProps={{ backdrop: { timeout: 500 } }}
        >
          <Fade in={open}>
            <Box className="venue_search_modal">
              <Box className="mt15">
                <form className="create_event_form">
                  <Box>
                    <Typography className="title" variant="body1">
                      Search Place Here
                    </Typography>
                    <TextField
                      placeholder="Search Place Here"
                      name="location"
                      type="search"
                      className="common_field_text"
                      variant="outlined"
                      value={localLocation}
                      sx={{
                        "& .MuiOutlinedInput-root": { borderRadius: "15px" },
                      }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <SearchIcon />
                          </InputAdornment>
                        ),
                      }}
                      onChange={handleLocationChange}
                      onKeyDown={handleKeyDown} // ✅ Detect Enter key
                    />
                  </Box>
                </form>
              </Box>
            </Box>
          </Fade>
        </Modal>
      </Box>
    </React.Fragment>
  );
}
