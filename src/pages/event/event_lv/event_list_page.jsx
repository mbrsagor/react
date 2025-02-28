import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import axios from "../../../services/axiosConfig";
import Events from "./events";
import ToolsBar from "../../../components/tools_bar";
import BottomMenuModal from "../../../components/bottom_modal";
import CustomSnackbar from "../../../components/snackbar";
import { MyEvents, EventDeleteURL } from "../../../services/api_service";

export default function EventListPage() {
  // Navigation
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "error",
  });
  const [dialogOpen, setDialogOpen] = useState(false); // For the confirmation dialog
  const [selectedEventId, setSelectedEventId] = useState(null); // Store selected event ID

  // Snackbar
  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);

  const handleDialogOpen = (eventId) => {
    setSelectedEventId(eventId);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setSelectedEventId(null); // Reset selected event ID
  };

  const handleDeleteEvent = async () => {
    try {
      const response = await axios.delete(EventDeleteURL(selectedEventId));
      if (response.status === 200) {
        setSnackbar({
          open: true,
          message: response.data.message,
          severity: "success",
        });
        // Optionally, update UI state or remove event from list
        setEvents(events.filter((event) => event.id !== selectedEventId));
      }
    } catch (err) {
      setSnackbar({
        open: true,
        message: err.response?.data?.message || "Something went wrong.",
        severity: "error",
      });
    } finally {
      handleDialogClose(); // Close dialog after deletion
    }
  };

  // Fetching my events data
  useEffect(() => {
    axios
      .get(MyEvents)
      .then((response) => {
        if (response) {
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
        <Box className="parent_sec pb80">
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
                update_event={() => navigate(`/event-update/${event.id}`)}
                delete_event={() => handleDialogOpen(event.id)} // Open dialog to confirm deletion
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
      </Container>
    </React.Fragment>
  );
}
