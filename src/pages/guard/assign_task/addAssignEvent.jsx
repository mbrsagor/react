import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Button from "@mui/material/Button";
import { FormControl, MenuItem, Select } from "@mui/material";

import { MyEvents, AssignedEvents } from "../../../services/api_service";
import axios from "../../../services/axiosConfig";
import CustomLoader from "../../../components/customLoader";
import CustomSnackbar from "../../../components/snackbar";

export default function AddAssignEvent() {
  // Model
  const [events, setEvents] = useState([]);
  const [event, setEvent] = useState(""); // Single state for tracking selection
  const { id } = useParams(); // Get userId from the URL

  // messages
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "error",
  });

  // Snackbar
  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  // Assigned event handlers
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(AssignedEvents, {
        event: event,
        guard: id,
      });
      if (response.status === 201) {
        setSnackbar({
          open: true,
          message: response.data.message,
          severity: "success",
        });
        setEvent(""); // Reset selection after submission
      } else {
        setSnackbar({
          open: true,
          message: response.data.message,
          severity: "error",
        });
      }
    } catch (err) {
      setSnackbar({
        open: true,
        message: err.response?.data?.message || "Something went wrong.",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Get all events
    axios
      .get(MyEvents)
      .then((response) => {
        setEvents(response.data.data || []);
      })
      .catch(() => setEvents([]));
  }, []);

  return (
    <React.Fragment>
      <CssBaseline />
      <Container className="content">
        <Box className="assigned">
          <Box className="add_assign_event">
            <form onSubmit={handleSubmit}>
              <FormControl fullWidth>
                <Select
                  id="event-select"
                  className="custom-select common_field_text"
                  value={event}
                  onChange={(e) => setEvent(e.target.value)}
                  displayEmpty // 🔥 Important: Allows placeholder-like behavior
                >
                  <MenuItem value="" disabled>
                    Tab Here to select
                  </MenuItem>
                  {events.length > 0 ? (
                    events.map((ev) => (
                      <MenuItem key={ev.id} value={ev.id}>
                        {ev.title}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem disabled>No Event Available</MenuItem>
                  )}
                </Select>
              </FormControl>
              <Button variant="contained" className="app_btn mt6" type="submit">
                Submit
              </Button>
              {loading && <CustomLoader />}
            </form>
            <CustomSnackbar
              open={snackbar.open}
              message={snackbar.message}
              severity={snackbar.severity}
              onClose={handleSnackbarClose}
            />
          </Box>
        </Box>
      </Container>
    </React.Fragment>
  );
}
