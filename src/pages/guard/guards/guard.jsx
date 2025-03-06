import React, { useState, useEffect } from "react";
import Avatar from "@mui/joy/Avatar";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import AddCircleOutlineTwoToneIcon from "@mui/icons-material/AddCircleOutlineTwoTone";

import ManAvatar from "../../../assets/avatar.png";
import ToolsBar from "../../../components/tools_bar";
import axios from "../../../services/axiosConfig";
import CustomSnackbar from "../../../components/snackbar";
import { MyGuards, GuardDeleteURL } from "../../../services/api_service";
import GuardModal from "./guardModal";

export default function Guard() {
  const [modalOpen, setModalOpen] = useState(false); // For the modal
  const [dialogOpen, setDialogOpen] = useState(false); // For the delete dialog
  const [users, setUsers] = useState([]); // List of guards
  const [selectedUser, setSelectedUser] = useState(null); // Selected user for deletion
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "error",
  });

  const handleOpen = () => setModalOpen(true); // Open the modal

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setSelectedUser(null); // Clear selected user on dialog close
  };

  const fetchGuards = () => {
    axios
      .get(MyGuards)
      .then((response) => {
        if (response.data.status === "success") {
          setUsers(response.data.data);
        }
      })
      .catch((error) => {
        setSnackbar({
          open: true,
          message: error.message,
          severity: "error",
        });
        setUsers([]);
      });
  };

  useEffect(() => {
    fetchGuards();
  }, []);

  const handleDeleteEvent = async () => {
    if (!selectedUser) return;

    try {
      const response = await axios.delete(GuardDeleteURL(selectedUser));
      if (response.status === 200) {
        setSnackbar({
          open: true,
          message: response.data.message || "Guard deleted successfully!",
          severity: "success",
        });
        // Remove deleted user from the list
        setUsers(users.filter((user) => user.id !== selectedUser));
      }
    } catch (err) {
      setSnackbar({
        open: true,
        message: err.response?.data?.message || "Failed to delete guard.",
        severity: "error",
      });
    } finally {
      handleDialogClose(); // Close dialog regardless of outcome
    }
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container className="content">
        <ToolsBar
          link="/home"
          title="Guard"
          handleOpen={handleOpen}
          CustomIcon={AddCircleOutlineTwoToneIcon}
        />
        <Box className="parent_sec pb80">
          {users && users.length > 0 ? (
            users.map((user) => (
              <Box key={user.id} className="guard_lv_sec">
                <Box className="package_left_text">
                  <Link to={`/assign-event/${user.id}`}>
                    <Box className="gard_card_sec">
                      <Box className="avatar_sec">
                        <Avatar
                          alt="Guard"
                          src={ManAvatar}
                          sx={{
                            width: 80,
                            height: 80,
                          }}
                        />
                      </Box>
                      <Box>
                        <Box className="mb5">
                          <Typography
                            className="active_user_status"
                            variant="body1"
                          >
                            active
                          </Typography>
                        </Box>
                        <Box className="mb5">
                          <Typography className="fullname" variant="p">
                            {user.fullname}
                          </Typography>
                        </Box>
                        <Box>
                          <Typography
                            className="menu_item_text"
                            variant="body1"
                          >
                            {user.email}
                          </Typography>
                        </Box>
                        <Box>
                          <Typography
                            className="menu_item_text"
                            variant="body1"
                          >
                            {user.phone}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Link>
                </Box>
                <Box className="actions">
                  <Button
                    onClick={() => {
                      setSelectedUser(user.id); // Set the selected user
                      setDialogOpen(true); // Open delete dialog
                    }}
                  >
                    <DeleteRoundedIcon />
                  </Button>
                </Box>
              </Box>
            ))
          ) : (
            <Typography className="no_data_text" variant="body1">
              No Data Available
            </Typography>
          )}
        </Box>
        <GuardModal
          open={modalOpen}
          handleClose={() => setModalOpen(false)}
          onGuardAdded={fetchGuards}
        />
        <CustomSnackbar
          open={snackbar.open}
          message={snackbar.message}
          severity={snackbar.severity}
          onClose={handleSnackbarClose}
        />
        <Dialog open={dialogOpen} onClose={handleDialogClose}>
          <DialogTitle>Warning</DialogTitle>
          <DialogContent>
            Are you sure you want to delete this guard?
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
      </Container>
    </React.Fragment>
  );
}
