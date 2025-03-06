import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import axios from "../../../services/axiosConfig";
import CustomSnackbar from "../../../components/snackbar";
import Events from "../../../pages/event/event_lv/events";
import { AssignedEvents, AssignEventDeleteURL } from "../../../services/api_service";

export default function AssignEvents() {
  const [events, setEvents] = useState([]);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "error",
  });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const { id } = useParams();

  // Snackbar
  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleDialogOpen = (eventId) => {
    setSelectedEventId(eventId);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setSelectedEventId(null);
  };

  const handleDeleteEvent = async () => {
    try {
      const response = await axios.delete(
        AssignEventDeleteURL(selectedEventId)
      );
      if (response.status === 200) {
        setSnackbar({
          open: true,
          message: response.data.message,
          severity: "success",
        });
        // Remove the deleted event from the UI
        setEvents((prevEvents) =>
          prevEvents.filter((event) => event.assignId !== selectedEventId)
        );
      }
    } catch (err) {
      setSnackbar({
        open: true,
        message: err.response?.data?.message || "Something went wrong.",
        severity: "error",
      });
    } finally {
      handleDialogClose();
    }
  };

  useEffect(() => {
    axios
      .get(AssignedEvents, {
        params: { guard: id },
      })
      .then((response) => {
        if (response.data?.data) {
          setEvents(
            response.data.data.map((item) => ({
              ...item.event,
              assignId: item.id, // Store outer object's ID for deletion
            }))
          );
        }
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
        setEvents([]);
      });
  }, [id]);

  return (
    <React.Fragment>
      <CssBaseline />
      <Box>
        {events.length > 0 ? (
          events.map((event) => (
            <Events
              key={event.id}
              banner={event.thumbnail}
              title={event.title}
              start_date={event.start_date}
              end_date={event.end_date}
              venue={event.location}
              tags={event.tags}
              delete_event={() => handleDialogOpen(event.assignId)}
            />
          ))
        ) : (
          <Typography className="no_data_text" variant="body">
            No Data Available
          </Typography>
        )}
      </Box>
      {/* Confirmation Dialog */}
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Warning</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this event?
        </DialogContent>
        <DialogActions>
          <Button className="custom_dialog_btn" onClick={handleDeleteEvent}>
            Yes
          </Button>
          <Button className="custom_dialog_btn" onClick={handleDialogClose}>
            Not Now
          </Button>
        </DialogActions>
      </Dialog>
      <CustomSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={handleSnackbarClose}
      />
    </React.Fragment>
  );
}
