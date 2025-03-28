import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { Link, useNavigate } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { Typography, Button } from "@mui/material";

import Avatar from "../../assets/avatar.png";
import axios from "../../services/axiosConfig";
import ToolsBar from "../../components/tools_bar";
import CustomSnackbar from "../../components/snackbar";
import { FollowersURL, UnFollowersURL } from "../../services/api_service";

export default function MyHosts() {
  const [hosts, setHosts] = useState([]);
  const navigate = useNavigate();
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
      .get(FollowersURL) // API call
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

  // UnFollow handler
  const UnFollowHandlers = (host_id) => {
    axios
      .delete(UnFollowersURL(host_id)) // Ensure this is a function
      .then((response) => {
        if (response.status === 200) {
          // Navigate to the same route again
          navigate("/hosts");
          setSnackbar({
            open: true,
            message: response.data.message,
            severity: "success",
          });
        }

        // Remove unfollowed host from list
        setHosts((prevHosts) =>
          prevHosts.filter((host) => host.id !== host_id)
        );
      })
      .catch((error) => {
        setSnackbar({
          open: true,
          message: error.response?.data?.message || "Something went wrong.",
          severity: "error",
        });
      });
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container className="content">
        <ToolsBar link="/profile" title="My Hosts" />
        <Box className="parent_sec pb80">
          {hosts.length > 0 ? (
            hosts.map((host) => (
              <Box key={host.id} className="host_parent_sec">
                <Link to={`/host/${host.host}`} state={{ host: host.id }}>
                  <Box className="host_lv">
                    <Box className="avatar">
                      <img src={host.avatar || Avatar} alt={host.host_name} />
                    </Box>
                    <Box className="host_info">
                      <Typography className="name" variant="h6">
                        {host.host_name}
                      </Typography>
                      <Typography className="date" variant="body1">
                        {host.created_at}
                      </Typography>
                      <Button
                        onClick={() => UnFollowHandlers(host.id)} // ✅ Pass host.id
                        variant="contained"
                        className="btn"
                      >
                        Unfollow
                      </Button>
                    </Box>
                  </Box>
                </Link>
              </Box>
            ))
          ) : (
            <Typography className="no_data_text" variant="body1">
              No Data Available
            </Typography>
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
