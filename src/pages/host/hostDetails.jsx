import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { useLocation } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { Typography } from "@mui/material";
import HostDetailTab from "./hostDetailTab";
import ToolsBar from "../../components/tools_bar";
import Avatar from "../../assets/avatar.png";
import axios from "../../services/axiosConfig";
import CustomSnackbar from "../../components/snackbar";
import { HostDetailsURL } from "../../services/api_service";

export default function HostDetails() {
  // Model
  const location = useLocation();
  const user_id = location.state?.host;
  const [host, setHost] = useState([]);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "error",
  });

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  // Fetch profile information
  useEffect(() => {
    // Replace 1 with the actual host_id you want to fetch information about.
    const endpoint = `${HostDetailsURL({ user_id })}?host_id=${user_id}`;
    axios
      .get(endpoint) // API call
      .then((response) => {
        // console.log(response.data.data);
        setHost(response.data.data);
      })
      .catch((error) => {
        setSnackbar({
          open: true,
          message: error.response?.data?.message || "Something went wrong.",
          severity: "error",
        });
      });
  }, [user_id]);

  return (
    <React.Fragment>
      <CssBaseline />
      <Container className="content">
        <ToolsBar link="/hosts" title="Host Details" />
        <Box className="parent_sec pb80">
          <Box className="host_top_sec">
            <Box className="host_avatar">
              <img src={host.avatar || Avatar} alt="" />
            </Box>
            <Typography className="name" variant="h6">
              {host.fullname}
            </Typography>
          </Box>
          <Box className="host_bottom_sec">
            <HostDetailTab
              name={host.fullname}
              email={host.email}
              phone={host.phone}
              address={host.address}
              gender={host.get_gender}
              city={host.city}
              zip={host.zip}
              state={host.state}
            />
          </Box>
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
