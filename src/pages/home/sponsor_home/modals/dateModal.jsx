/* eslint-disable react/prop-types */
import React, { useState } from "react";
import Fade from "@mui/material/Fade";
import Modal from "@mui/material/Modal";
import { Link } from "react-router-dom";
import { Typography, Box, CssBaseline, TextField, Button } from "@mui/material";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

export default function DateModal({
  open,
  handleClose,
  setFilters,
  fetchEvents,
}) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Handle date changes
  const handleDateChange = (e) => {
    const { name, value } = e.target;
    if (name === "start_date") setStartDate(value);
    if (name === "end_date") setEndDate(value);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload

    setFilters((prevFilters) => {
      const newFilters = {
        ...prevFilters,
        start_date: startDate,
        end_date: endDate,
      };
      fetchEvents(newFilters); // Fetch events after setting filters
      return newFilters;
    });

    handleClose(); // Close modal after applying filter
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Box>
        <Modal
          aria-labelledby="date"
          aria-describedby="date-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          slotProps={{ backdrop: { timeout: 500 } }}
        >
          <Fade in={open}>
            <Box className="venue_search_modal date_range_modal">
              <Box className="mt15">
                <Box className="filter_header_sec">
                  <Typography className="title" variant="body1">
                    Filter
                  </Typography>
                  <Link to="#" onClick={() => window.location.reload()}>
                    <RestartAltIcon />
                  </Link>
                </Box>

                <form className="date_range_sec" onSubmit={handleSubmit}>
                  <Box className="mt5">
                    <Typography className="title" variant="body1">
                      Event Start Date
                    </Typography>
                    <TextField
                      placeholder="Tap Filter By Date"
                      name="start_date"
                      type="date"
                      value={startDate} // ✅ Add value
                      onChange={handleDateChange} // ✅ Handle change
                      className="common_field_text"
                      variant="outlined"
                      sx={{
                        "& .MuiOutlinedInput-root": { borderRadius: "15px" },
                      }}
                    />
                  </Box>
                  <Box className="mt5">
                    <Typography className="title" variant="body1">
                      Event End Date
                    </Typography>
                    <TextField
                      placeholder="Tap Filter By Date"
                      name="end_date"
                      type="date"
                      value={endDate} // ✅ Add value
                      onChange={handleDateChange} // ✅ Handle change
                      className="common_field_text"
                      variant="outlined"
                      sx={{
                        "& .MuiOutlinedInput-root": { borderRadius: "15px" },
                      }}
                    />
                  </Box>
                  <Button
                    variant="contained"
                    className="modal_submit_btn mt5"
                    type="submit"
                  >
                    Apply Filter
                  </Button>
                </form>
              </Box>
            </Box>
          </Fade>
        </Modal>
      </Box>
    </React.Fragment>
  );
}
