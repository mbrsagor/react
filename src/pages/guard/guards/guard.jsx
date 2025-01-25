import React, { useState, useEffect } from "react";
import Avatar from "@mui/joy/Avatar";
import Box from "@mui/material/Box";
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

import ToolsBar from "../../../components/tools_bar";
import axios from "../../../services/axiosConfig";
import CustomSnackbar from "../../../components/snackbar";
import { MyGuards } from "../../../services/api_service";

export default function Guard() {
  const [modalOpen, setModalOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [users, setUsers] = useState([]);
  // Snackbar state
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "error",
  });

  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
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
          message: error,
          severity: "error",
        });
        setUsers([]);
      });
  };

  useEffect(() => {
    fetchGuards();
  }, []);

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
        <Box className="parent_sec">
          {users && users.length > 0 ? (
            users.map((user) => (
              <Box key={user.id} className="package_lv_sec">
                <Box className="package_left_text">
                  <Box className="gard_card_sec">
                    <Box className="avatar_sec">
                      <Avatar size="lg" />
                    </Box>
                    <Box>
                      <Box>
                        <Typography
                          className="active_user_status"
                          variant="body1"
                        >
                          active
                        </Typography>
                      </Box>
                      <Box>
                        <Typography className="fullname" variant="p">
                          {user.fullname}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography className="menu_item_text" variant="body1">
                          {user.email}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography className="menu_item_text" variant="body1">
                          {user.phone}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
                <Box className="actions">
                  <Button onClick={() => handleDialogOpen(user.id)}>
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
