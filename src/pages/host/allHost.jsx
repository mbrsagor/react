import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { Typography, Button } from "@mui/material";

import Avatar from "../../assets/avatar.png";
import axios from "../../services/axiosConfig";
import ToolsBar from "../../components/tools_bar";
import CustomSnackbar from "../../components/snackbar";
import { HostListURL, FollowersURL } from "../../services/api_service";

export default function AllHostListView() {
  const [hosts, setHosts] = useState([]);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "error",
  });

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  useEffect(() => {
    axios
      .get(HostListURL) // API call
      .then((response) => {
        setHosts(response.data.data);
      })
      .catch((error) => {
        setSnackbar({
          open: true,
          message: error.response?.data?.message || "Something went wrong.",
          severity: "error",
        });
      });
  }, []);

  // Handle follow action
  const handleFollow = async (hostId) => {
    try {
      const response = await axios.post(FollowersURL, { host: hostId });

      if (response.status === 201) {
        setSnackbar({
          open: true,
          message: response.data.message,
          severity: "success",
        });

        // Update the host list to reflect the new follower count (optional)
        setHosts((prevHosts) =>
          prevHosts.map((host) =>
            host.id === hostId
              ? { ...host, total_follower: host.total_follower + 1 }
              : host
          )
        );

        console.log(response.data);
      } else {
        setSnackbar({
          open: true,
          message: response.data.message,
          severity: "error",
        });
        console.log(response.data.message);
      }
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
      <CssBaseline />
      <Container className="content">
        <ToolsBar link="/profile" title="Who To Follow" />
        <Box className="parent_sec pb80">
          {hosts.length > 0 ? (
            hosts.map((host) => (
              <Box key={host.id} className="host_parent_sec">
                <Box className="host_lv">
                  <Box className="avatar">
                    <img src={host.avatar || Avatar} alt="" />
                  </Box>
                  <Box className="host_info">
                    <Typography className="name" variant="h6">
                      {host.host_name}
                    </Typography>
                    <Typography className="total_followed" variant="p">
                      {host.total_follower} Followed
                    </Typography>
                    <Typography className="date" variant="body1">
                      {host.created_at}
                    </Typography>
                    <Box className="follow_btn_sec">
                      <Button
                        onClick={() => handleFollow(host.id)} // ✅ Pass host.id
                        variant="contained"
                        className="btn"
                      >
                        Follow
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </Box>
            ))
          ) : (
            <Typography variant="body1">No Data Available</Typography>
          )}
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
