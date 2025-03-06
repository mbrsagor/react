import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import { TextField, Button, Switch } from "@mui/material";

import { GuardDeleteURL } from "../../../services/api_service";
import axios from "../../../services/axiosConfig";
import CustomLoader from "../../../components/customLoader";
import CustomSnackbar from "../../../components/snackbar";

export default function GuardUpdate() {
  const { id } = useParams(); // Get userId from the URL

  // messages
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "error",
  });

  const [userData, setUserData] = useState({
    fullname: "",
    phone: "",
    is_active: true,
  });

  const handleInputChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  // Snackbar
  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  // Fetch user data
  useEffect(() => {
    axios
      .get(GuardDeleteURL(id)) // Pass id to EventDetailURL
      .then((response) => {
        if (response) {
          const guard = response.data.data;
          setUserData({
            ...guard,
          });
        }
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
        setUserData([]);
      });
  }, [id]);

  // Update switch state
  const handleSwitchChange = (e) => {
    setUserData({
      ...userData,
      is_active: e.target.checked, // Use checked instead of value
    });
  };

  // Update guard handlers
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.put(GuardDeleteURL(id), userData);
      if (response.status === 200) {
        setSnackbar({
          open: true,
          message: response.data.message,
          severity: "success",
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

  return (
    <React.Fragment>
      <CssBaseline />
      <Container className="content">
        <Box className="create_event_form">
          <form onSubmit={handleSubmit}>
            <Box>
              <Typography className="guard_update_label" variant="p">
                Full Name
              </Typography>
              <TextField
                placeholder="Write Here"
                name="fullname"
                className="common_field_text"
                variant="outlined"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "15px",
                  },
                }}
                onChange={handleInputChange}
                value={userData.fullname}
              />
            </Box>
            <Box>
              <Typography className="guard_update_label" variant="p">
                Phone
              </Typography>
              <TextField
                placeholder="Write Here"
                name="phone"
                className="common_field_text"
                variant="outlined"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "15px",
                  },
                }}
                onChange={handleInputChange}
                value={userData.phone}
              />
            </Box>
            <Box className="guard_update_status_sec">
              <Typography className="guard_update_label" variant="h6">
                Guard Status
              </Typography>
              <Switch
                checked={userData.is_active} // Bind to checked, not value
                onChange={handleSwitchChange}
                value={userData.is_active}
              />
            </Box>
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
      </Container>
    </React.Fragment>
  );
}
